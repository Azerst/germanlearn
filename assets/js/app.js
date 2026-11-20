/* =========================================================
   App Controller — Giao diện + logic (không chứa DB)
   ========================================================= */
const App = {
  state: {
    user: null,
    view: 'home',
    pendingRoute: null,
    vocabTopic: 'Gia đình',
    vocabSearch: '',
    flashcardDeck: [], flashcardIndex: 0,
    quizQuestions: [], quizIndex: 0, quizScore: 0, quizAnswered: false,
    examQuestions: [], examAnswers: [], examTimeLeft: 600,
    examTimer: null, examActive: false,
    adminTab: 'users',
    grammarKey: null,
    _toastTimer: null
  },

  async init() {
    try {
      const ic = IntegrityCheck.run();
      if (!ic.ok) throw new Error('Thiếu module: ' + ic.missing.join(', '));

      await DBHelper.init();

      /* Khôi phục session */
      const session = SessionManager.get();
      if (session) {
        try {
          const user = await UserDB.get('users', session.email);
          if (user) this.state.user = user;
          else SessionManager.clear();
        } catch { SessionManager.clear(); }
      }

      /* Session refresh định kỳ */
      setInterval(() => { if (this.state.user) SessionManager.refresh(); }, 60000);

      this.state.view = 'home';
      this.render();
    } catch (err) {
      this.showInitError(err);
    }
  },

  showInitError(err) {
    const msg = Sanitizer.esc(String((err && err.message) || err));
    document.getElementById('app').innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;font-family:system-ui">
        <div style="max-width:540px;width:100%;background:#fff;border-radius:16px;padding:32px;box-shadow:0 10px 40px rgba(0,0,0,.1);border:2px solid #ef4444">
          <div style="font-size:48px;text-align:center;margin-bottom:12px">⚠️</div>
          <h1 style="color:#d93828;font-size:22px;margin-bottom:8px;text-align:center">Không thể khởi tạo</h1>
          <div style="background:#fef2f2;border-left:4px solid #ef4444;padding:12px 16px;border-radius:8px;margin:16px 0">
            <strong style="font-size:13px;color:#991b1b">Lỗi:</strong><br>
            <code style="font-size:12px;color:#7f1d1d;word-break:break-all">${msg}</code>
          </div>
          <ol style="font-size:13px;color:#475569;padding-left:20px;line-height:1.8;margin-bottom:16px">
            <li>Đảm bảo 5 file JS + 6 file CSS đúng đường dẫn</li>
            <li>Mở F12 → Console xem lỗi chi tiết</li>
            <li>Không dùng chế độ Ẩn danh (chặn IndexedDB)</li>
            <li>Chạy qua <code>localhost</code> thay vì <code>file://</code></li>
          </ol>
          <div style="display:flex;gap:8px">
            <button onclick="location.reload()" style="flex:1;padding:11px;background:#d93828;color:#fff;border:none;border-radius:10px;font-weight:600;cursor:pointer">Tải lại</button>
            <button onclick="if(confirm('Xóa TOÀN BỘ dữ liệu local?')){try{indexedDB.deleteDatabase('DeutschLern_Users');indexedDB.deleteDatabase('DeutschLern_Content');localStorage.clear();}catch(e){}setTimeout(()=>location.reload(),600)}"
              style="flex:1;padding:11px;background:#fff;color:#d93828;border:1.5px solid #d93828;border-radius:10px;font-weight:600;cursor:pointer">Reset</button>
          </div>
        </div>
      </div>`;
  },

  /* ========== Helpers ========== */
  esc(s) { return Sanitizer.esc(s); },
  initial(n) { return (n || 'U').trim().charAt(0).toUpperCase(); },

  toast(msg, type = '') {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.className = 'toast show' + (type ? ' ' + type : '');
    clearTimeout(this.state._toastTimer);
    this.state._toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
  },
  openModal(html) {
    document.getElementById('modalRoot').innerHTML =
      `<div class="modal-backdrop show" onclick="if(event.target===this)App.closeModal()">
        <div class="modal">${html}</div>
      </div>`;
  },
  closeModal() { document.getElementById('modalRoot').innerHTML = ''; },
  scrollTo(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); },

  /* ========== Router ========== */
  go(view) {
    const protectedViews = ['dashboard', 'vocabulary', 'flashcards', 'quiz', 'grammar', 'exam', 'profile', 'admin'];

    /* Session check */
    if (protectedViews.includes(view)) {
      if (!this.state.user) {
        this.state.pendingRoute = view;
        this.state.view = 'login';
        this.render();
        this.toast('Vui lòng đăng nhập để tiếp tục', 'warning');
        window.scrollTo(0, 0);
        return;
      }
      /* Kiểm tra session hết hạn */
      const sess = SessionManager.get();
      if (!sess) {
        this.state.user = null;
        this.state.view = 'login';
        this.render();
        this.toast('Phiên đăng nhập đã hết hạn', 'warning');
        return;
      }
      SessionManager.refresh();
    }

    if (view === 'admin' && this.state.user?.role !== 'admin') {
      this.toast('Bạn không có quyền truy cập', 'error');
      return;
    }

    if (this.state.examTimer) {
      clearInterval(this.state.examTimer);
      this.state.examTimer = null;
      this.state.examActive = false;
    }
    this.state.view = view;
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  /* ========== Auth ========== */
  async login() {
    const id = Sanitizer.clean(document.getElementById('login-id').value, 100).toLowerCase();
    const pw = document.getElementById('login-pw').value;

    if (!id || !pw) return this.toast('Nhập đầy đủ thông tin', 'error');

    /* Rate limit */
    const rl = RateLimiter.check(id);
    if (rl.locked) {
      return this.toast(`Tài khoản bị khóa. Thử lại sau ${rl.remaining} phút`, 'error');
    }

    try {
      const user = await UserDB.get('users', id);
      const ok = user && DBHelper.verify(pw, user.password);

      if (!ok) {
        const f = RateLimiter.fail(id);
        const left = RateLimiter.MAX_ATTEMPTS - (f.attempts || 0);
        if (f.lockUntil) {
          return this.toast(`Sai quá nhiều lần. Khóa ${RateLimiter.LOCK_MINUTES} phút`, 'error');
        }
        return this.toast(`Sai tài khoản hoặc mật khẩu. Còn ${left} lần thử`, 'error');
      }

      RateLimiter.success(id);
      SessionManager.set(user.email);
      this.state.user = user;
      await this.touchProgress();

      const dest = this.state.pendingRoute || (user.role === 'admin' ? 'admin' : 'dashboard');
      this.state.pendingRoute = null;
      this.state.view = dest;
      this.render();
      this.toast(`Chào mừng, ${user.name}!`, 'success');
    } catch (err) {
      console.error(err);
      this.toast('Lỗi đăng nhập. Vui lòng thử lại.', 'error');
    }
  },

  async register() {
    const name = Sanitizer.clean(document.getElementById('reg-name').value, 60);
    const email = Sanitizer.clean(document.getElementById('reg-email').value, 100).toLowerCase();
    const pw = document.getElementById('reg-pw').value;
    const pw2 = document.getElementById('reg-pw2').value;

    if (!name || !email || !pw) return this.toast('Nhập đủ thông tin', 'error');
    if (name.length < 2) return this.toast('Tên quá ngắn', 'error');
    if (!Sanitizer.isEmail(email)) return this.toast('Email không hợp lệ', 'error');
    if (!Sanitizer.isStrongPassword(pw)) {
      return this.toast('Mật khẩu ≥ 8 ký tự, có chữ hoa, chữ thường và số', 'error');
    }
    if (pw !== pw2) return this.toast('Mật khẩu không khớp', 'error');

    try {
      if (await UserDB.get('users', email)) {
        return this.toast('Email đã tồn tại', 'error');
      }

      const salt = DBHelper.genSalt();
      const user = {
        email,
        name,
        role: 'user',
        password: DBHelper.hash(pw, salt),
        createdAt: Date.now()
      };
      await UserDB.put('users', user);
      await UserDB.put('progress', { email, completed: 0, streak: 1, lastVisit: Date.now() });

      SessionManager.set(email);
      this.state.user = user;

      const dest = this.state.pendingRoute || 'dashboard';
      this.state.pendingRoute = null;
      this.state.view = dest;
      this.render();
      this.toast('Đăng ký thành công!', 'success');
    } catch (err) {
      console.error(err);
      this.toast('Lỗi đăng ký', 'error');
    }
  },

  logout() {
    if (!confirm('Đăng xuất?')) return;
    SessionManager.clear();
    this.state.user = null;
    this.state.view = 'home';
    this.render();
    window.scrollTo(0, 0);
  },

  async touchProgress() {
    if (!this.state.user) return;
    try {
      let p = await UserDB.get('progress', this.state.user.email);
      if (!p) p = { email: this.state.user.email, completed: 0, streak: 1 };
      p.lastVisit = Date.now();
      await UserDB.put('progress', p);
    } catch {}
  },

  /* ========== Nav / Footer ========== */
  nav() {
    const u = this.state.user;
    const logoClick = u ? `App.go('${u.role === 'admin' ? 'admin' : 'dashboard'}')` : `App.go('home')`;

    if (!u) {
      return `
      <nav class="nav">
        <div class="nav-inner">
          <div class="logo" onclick="${logoClick}">
            <div class="logo-icon">DL</div>
            <div>DeutschLern<small>Học tiếng Đức A1–C1</small></div>
          </div>
          <div class="nav-links" id="navLinks">
            <button onclick="App.go('home')">Trang chủ</button>
            <button onclick="App.scrollTo('features')">Tính năng</button>
            <button onclick="App.scrollTo('topics')">Chủ đề</button>
            <button onclick="App.go('vocabulary')">Từ vựng</button>
            <button onclick="App.go('grammar')">Ngữ pháp</button>
          </div>
          <div class="nav-actions">
            <button class="btn btn-glass btn-sm" onclick="App.go('login')">Đăng nhập</button>
            <button class="btn btn-primary btn-sm" onclick="App.go('register')">Đăng ký</button>
            <button class="burger" onclick="document.getElementById('navLinks').classList.toggle('open')">☰</button>
          </div>
        </div>
      </nav>`;
    }

    const items = [
      ['dashboard', 'Dashboard'], ['vocabulary', 'Từ vựng'], ['flashcards', 'Flashcards'],
      ['quiz', 'Quiz'], ['grammar', 'Ngữ pháp'], ['exam', 'Thi thử'], ['profile', 'Cá nhân']
    ];
    return `
      <nav class="nav">
        <div class="nav-inner">
          <div class="logo" onclick="${logoClick}">
            <div class="logo-icon">DL</div>
            <div>DeutschLern<small>${this.esc(u.name)}</small></div>
          </div>
          <div class="nav-links" id="navLinks">
            <button onclick="App.go('home')">Trang chủ</button>
            ${items.map(([v, t]) => `<button class="${this.state.view === v ? 'active' : ''}" onclick="App.go('${v}')">${t}</button>`).join('')}
            ${u.role === 'admin' ? `<button class="admin-btn ${this.state.view === 'admin' ? 'active' : ''}" onclick="App.go('admin')">⚡ Admin</button>` : ''}
          </div>
          <div class="nav-actions">
            <div class="user-chip" onclick="App.go('profile')">
              <div class="avatar">${this.initial(u.name)}</div>
              <div class="user-chip-name">${this.esc(u.name)}</div>
            </div>
            <button class="btn btn-glass btn-sm" onclick="App.logout()">Đăng xuất</button>
            <button class="burger" onclick="document.getElementById('navLinks').classList.toggle('open')">☰</button>
          </div>
        </div>
      </nav>`;
  },

  footer() {
    return `
    <footer class="footer">
      <div class="footer-inner">
        <div>
          <div class="brand">DeutschLern</div>
          <p class="tagline">Nền tảng học tiếng Đức A1–C1 cho người Việt. Từ vựng, ngữ pháp, luyện thi Goethe, TELC, ÖSD.</p>
        </div>
        <div>
          <h4>Học tập</h4>
          <a onclick="App.go('vocabulary')">Từ vựng</a>
          <a onclick="App.go('flashcards')">Flashcards</a>
          <a onclick="App.go('grammar')">Ngữ pháp</a>
          <a onclick="App.go('exam')">Thi thử</a>
        </div>
        <div>
          <h4>Tài khoản</h4>
          <a onclick="App.go('login')">Đăng nhập</a>
          <a onclick="App.go('register')">Đăng ký</a>
          <a onclick="App.go('profile')">Hồ sơ</a>
        </div>
      </div>
      <div class="footer-bottom">© ${new Date().getFullYear()} DeutschLern · Made with ❤️ for Vietnamese learners</div>
    </footer>`;
  },

  /* ========== Render ========== */
  render() {
    const app = document.getElementById('app');
    const v = this.state.view;
    const publicViews = ['home', 'login', 'register'];

    if (!this.state.user && !publicViews.includes(v)) {
      this.state.view = 'login';
    }

    let html = '';
    if (v === 'home') html = this.nav() + this.viewHome() + this.footer();
    else if (v === 'login' || v === 'register') {
      html = this.nav() + (v === 'login' ? this.viewLogin() : this.viewRegister());
    } else {
      html = this.nav() + `<main>${this.viewContent()}</main>`;
    }
    app.innerHTML = html;
  },

  viewContent() {
    switch (this.state.view) {
      case 'dashboard': return this.viewDashboard();
      case 'vocabulary': return this.viewVocabulary();
      case 'flashcards': return this.viewFlashcards();
      case 'quiz': return this.viewQuiz();
      case 'grammar': return this.viewGrammar();
      case 'exam': return this.viewExam();
      case 'profile': return this.viewProfile();
      case 'admin': return this.viewAdmin();
      default: return this.viewDashboard();
    }
  },

  /* ========== Home ========== */
  viewHome() {
    const totalWords = Object.values(VOCAB).reduce((s, a) => s + a.length, 0);
    const totalTopics = Object.keys(VOCAB).length;
    return `
    <main>
      <section class="hero" id="hero">
        <div class="hero-inner">
          <div>
            <div class="hero-tag">🇩🇪 Học tiếng Đức A1 – C1</div>
            <h1>Tự tin chinh phục <span class="accent">tiếng Đức</span> cùng DeutschLern</h1>
            <p class="lede">Từ vựng, ngữ pháp, flashcards, quiz và thi thử Goethe / TELC / ÖSD — tất cả trong một nền tảng thân thiện cho người Việt.</p>
            <div class="hero-cta">
              <button class="btn btn-primary btn-lg" onclick="App.go(${this.state.user ? "'dashboard'" : "'register'"})">
                🚀 ${this.state.user ? 'Vào Dashboard' : 'Bắt đầu miễn phí'}
              </button>
              <button class="btn btn-glass btn-lg" onclick="App.scrollTo('features')">Tìm hiểu thêm →</button>
            </div>
            <div class="hero-stats">
              <div class="hero-stat"><div class="num">${totalWords}+</div><div class="lbl">Từ vựng</div></div>
              <div class="hero-stat"><div class="num">${totalTopics}</div><div class="lbl">Chủ đề</div></div>
              <div class="hero-stat"><div class="num">5</div><div class="lbl">Bài ngữ pháp</div></div>
              <div class="hero-stat"><div class="num">A1–C1</div><div class="lbl">Trình độ</div></div>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-emoji">🇩🇪</div>
            <div class="hero-badge b1"><div class="ico">📚</div><div>Từ vựng phong phú</div></div>
            <div class="hero-badge b2"><div class="ico">🎯</div><div>Quiz thông minh</div></div>
            <div class="hero-badge b3"><div class="ico">🏆</div><div>Thi thử chuẩn Goethe</div></div>
          </div>
        </div>
      </section>

      <section class="section" id="features">
        <div class="section-head">
          <div class="section-tag">Tính năng</div>
          <h2>Mọi công cụ bạn cần</h2>
          <p>Được thiết kế để việc học tiếng Đức trở nên thú vị và hiệu quả</p>
        </div>
        <div class="feature-grid">
          <div class="glass feature-card glass-round" onclick="App.go('vocabulary')">
            <div class="feature-icon">📚</div><h3>Từ vựng theo chủ đề</h3>
            <p>Học từ vựng được phân loại theo chủ đề thực tế: gia đình, công việc, du lịch...</p>
          </div>
          <div class="glass feature-card glass-round" onclick="App.go('flashcards')">
            <div class="feature-icon">🎴</div><h3>Flashcards 3D</h3>
            <p>Lật thẻ để ghi nhớ từ vựng siêu tốc, kèm phiên âm và ví dụ.</p>
          </div>
          <div class="glass feature-card glass-round" onclick="App.go('grammar')">
            <div class="feature-icon">📖</div><h3>Ngữ pháp chi tiết</h3>
            <p>Các quy tắc ngữ pháp cơ bản với ví dụ cụ thể, dễ hiểu.</p>
          </div>
          <div class="glass feature-card glass-round" onclick="App.go('exam')">
            <div class="feature-icon">🏆</div><h3>Thi thử có tính giờ</h3>
            <p>Mô phỏng đề thi Goethe A1 với 10 câu và đồng hồ đếm ngược.</p>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div class="section-tag">Lộ trình</div>
          <h2>Từ A1 đến C1</h2>
        </div>
        <div class="level-row">
          <div class="glass level-card glass-round"><div class="level-badge lv-a1">A1</div><h3>Sơ cấp</h3><p>Nhập môn</p></div>
          <div class="glass level-card glass-round"><div class="level-badge lv-a2">A2</div><h3>Sơ cấp</h3><p>Cơ bản</p></div>
          <div class="glass level-card glass-round"><div class="level-badge lv-b1">B1</div><h3>Trung cấp</h3><p>Giao tiếp</p></div>
          <div class="glass level-card glass-round"><div class="level-badge lv-b2">B2</div><h3>Trung cấp</h3><p>Lưu loát</p></div>
          <div class="glass level-card glass-round"><div class="level-badge lv-c1">C1</div><h3>Cao cấp</h3><p>Thành thạo</p></div>
        </div>
      </section>

      <section class="section" id="topics">
        <div class="section-head">
          <div class="section-tag">Chủ đề</div>
          <h2>${totalTopics} chủ đề từ vựng</h2>
          <p>Đăng nhập để học đầy đủ tất cả các chủ đề</p>
        </div>
        <div class="topic-grid">
          ${Object.keys(VOCAB).map(t => `
            <div class="glass topic-card glass-round" onclick="App.go('vocabulary')">
              <div class="emoji">${TOPIC_ICONS[t] || '📖'}</div>
              <h3>${t}</h3>
              <p>${VOCAB[t].length} từ</p>
            </div>`).join('')}
        </div>
      </section>

      <section class="section">
        <div class="section-head">
          <div class="section-tag">Đánh giá</div>
          <h2>Học viên nói gì</h2>
        </div>
        <div class="testimonial-grid">
          <div class="glass testimonial-card glass-round">
            <div class="stars">★★★★★</div>
            <div class="quote">"Giao diện đẹp, dễ dùng. Mình đã thi đỗ Goethe A1 chỉ sau 3 tháng ôn luyện."</div>
            <div class="who"><div class="avatar">LH</div>
              <div><div class="who-name">Lê Hương</div><div class="who-role">Sinh viên · Hà Nội</div></div></div>
          </div>
          <div class="glass testimonial-card glass-round">
            <div class="stars">★★★★★</div>
            <div class="quote">"Flashcards và quiz giúp mình nhớ từ rất nhanh. Recommend cho ai mới học tiếng Đức!"</div>
            <div class="who"><div class="avatar">TM</div>
              <div><div class="who-name">Trần Minh</div><div class="who-role">Kỹ sư · TP.HCM</div></div></div>
          </div>
          <div class="glass testimonial-card glass-round">
            <div class="stars">★★★★★</div>
            <div class="quote">"Ngữ pháp giải thích rõ ràng, ví dụ dễ hiểu. Rất phù hợp cho người mới bắt đầu."</div>
            <div class="who"><div class="avatar">NP</div>
              <div><div class="who-name">Nguyễn Phương</div><div class="who-role">Du học sinh · Berlin</div></div></div>
          </div>
        </div>
      </section>

      <section class="cta-section">
        <div class="glass cta-card">
          <h2>Sẵn sàng bắt đầu chưa?</h2>
          <p>Tạo tài khoản miễn phí và bắt đầu hành trình chinh phục tiếng Đức ngay hôm nay.</p>
          <div class="btns">
            <button class="btn btn-primary btn-lg" onclick="App.go(${this.state.user ? "'dashboard'" : "'register'"})">
              ${this.state.user ? 'Vào Dashboard' : 'Đăng ký ngay'}
            </button>
            ${!this.state.user ? `<button class="btn btn-glass btn-lg" onclick="App.go('login')">Đã có tài khoản?</button>` : ''}
          </div>
        </div>
      </section>
    </main>`;
  },

  /* ========== Login / Register ========== */
  viewLogin() {
    return `
    <div class="auth-page">
      <div class="glass auth-card glass-round">
        <div style="text-align:center;margin-bottom:18px">
          <div class="logo-icon" style="width:52px;height:52px;font-size:17px;margin:0 auto 10px">DL</div>
        </div>
        <h1>Chào mừng trở lại</h1>
        <p class="sub">Đăng nhập để tiếp tục học 🇩🇪</p>
        <div class="form-group">
          <label>Email / Tên đăng nhập</label>
          <input class="input" id="login-id" type="text" autocomplete="username" placeholder="ban@email.com" maxlength="100" onkeydown="if(event.key==='Enter')App.login()">
        </div>
        <div class="form-group">
          <label>Mật khẩu</label>
          <input class="input" id="login-pw" type="password" autocomplete="current-password" placeholder="••••••" maxlength="128" onkeydown="if(event.key==='Enter')App.login()">
        </div>
        <button class="btn btn-primary btn-block btn-lg" onclick="App.login()">Đăng nhập</button>
        <div class="auth-foot">Chưa có tài khoản? <a onclick="App.go('register')">Đăng ký ngay</a></div>
        <div class="auth-foot" style="margin-top:8px"><a onclick="App.go('home')">← Về trang chủ</a></div>
      </div>
    </div>`;
  },

  viewRegister() {
    return `
    <div class="auth-page">
      <div class="glass auth-card glass-round">
        <div style="text-align:center;margin-bottom:18px">
          <div class="logo-icon" style="width:52px;height:52px;font-size:17px;margin:0 auto 10px">DL</div>
        </div>
        <h1>Tạo tài khoản miễn phí</h1>
        <p class="sub">Bắt đầu hành trình chinh phục tiếng Đức</p>
        <div class="form-group"><label>Họ tên</label>
          <input class="input" id="reg-name" placeholder="Nguyễn Văn A" maxlength="60"></div>
        <div class="form-group"><label>Email</label>
          <input class="input" id="reg-email" type="email" placeholder="ban@email.com" maxlength="100" autocomplete="email"></div>
        <div class="form-group"><label>Mật khẩu</label>
          <input class="input" id="reg-pw" type="password" placeholder="Tối thiểu 8 ký tự, có chữ hoa + số" maxlength="128" autocomplete="new-password">
          <div class="hint">Yêu cầu: ≥ 8 ký tự, có chữ hoa, chữ thường và số</div></div>
        <div class="form-group"><label>Nhập lại mật khẩu</label>
          <input class="input" id="reg-pw2" type="password" placeholder="Nhập lại" maxlength="128" autocomplete="new-password" onkeydown="if(event.key==='Enter')App.register()"></div>
        <button class="btn btn-primary btn-block btn-lg" onclick="App.register()">Đăng ký</button>
        <div class="auth-foot">Đã có tài khoản? <a onclick="App.go('login')">Đăng nhập</a></div>
        <div class="auth-foot" style="margin-top:8px"><a onclick="App.go('home')">← Về trang chủ</a></div>
      </div>
    </div>`;
  },

  /* ========== Dashboard ========== */
  async viewDashboard() {
    const u = this.state.user;
    const p = await UserDB.get('progress', u.email) || { completed: 0, streak: 1 };
    const exams = await UserDB.getAll('examResults');
    const myExams = exams.filter(e => e.email === u.email);
    const anns = await ContentDB.getAll('announcements');
    const hour = new Date().getHours();
    const greet = hour < 12 ? 'Chào buổi sáng' : hour < 18 ? 'Chào buổi chiều' : 'Chào buổi tối';

    return `
    <div class="container">
      <div class="glass hero-card">
        <h1>${greet}, ${this.esc(u.name)} 👋</h1>
        <p>Hôm nay là một ngày tuyệt vời để học tiếng Đức. Bạn đã có <strong>${p.streak || 1} ngày</strong> streak — tiếp tục nhé!</p>
      </div>
      <div class="stats-grid">
        <div class="glass stat-card glass-round"><div class="lbl">Bài đã hoàn thành</div><div class="val">${p.completed || 0}</div><div class="sub">Cố lên!</div></div>
        <div class="glass stat-card glass-round"><div class="lbl">Streak</div><div class="val">🔥 ${p.streak || 1}</div><div class="sub">ngày liên tiếp</div></div>
        <div class="glass stat-card glass-round"><div class="lbl">Bài thi đã làm</div><div class="val">${myExams.length}</div><div class="sub">${myExams.length ? `Cao nhất: ${Math.max(...myExams.map(e => e.score))}/10` : 'Chưa có'}</div></div>
        <div class="glass stat-card glass-round"><div class="lbl">Từ vựng</div><div class="val">${Object.values(VOCAB).reduce((s, a) => s + a.length, 0)}</div><div class="sub">${Object.keys(VOCAB).length} chủ đề</div></div>
      </div>
      ${anns.length ? `
      <div class="glass glass-round" style="padding:22px 26px;margin-bottom:20px">
        <div class="sec-head"><h2>📢 Thông báo</h2></div>
        ${anns.slice(-3).reverse().map(a => `
          <div style="padding:10px 0;border-bottom:1px solid rgba(15,23,42,.06)">
            <div style="font-weight:700;margin-bottom:3px">${this.esc(a.title)}</div>
            <div style="font-size:13px;color:var(--muted)">${this.esc(a.content)}</div>
          </div>`).join('')}
      </div>` : ''}
      <div class="sec-head" style="margin-top:8px"><h2>🚀 Truy cập nhanh</h2></div>
      <div class="grid g4">
        <div class="glass feature-card glass-round" onclick="App.go('vocabulary')"><div class="feature-icon" style="background:linear-gradient(135deg,#3b82f6,#2563eb)">📚</div><h3>Từ vựng</h3><p>Học theo chủ đề</p></div>
        <div class="glass feature-card glass-round" onclick="App.go('flashcards')"><div class="feature-icon" style="background:linear-gradient(135deg,#8b5cf6,#7c3aed)">🎴</div><h3>Flashcards</h3><p>Ghi nhớ siêu tốc</p></div>
        <div class="glass feature-card glass-round" onclick="App.go('grammar')"><div class="feature-icon" style="background:linear-gradient(135deg,#f59e0b,#d97706)">📖</div><h3>Ngữ pháp</h3><p>Quy tắc cơ bản</p></div>
        <div class="glass feature-card glass-round" onclick="App.go('exam')"><div class="feature-icon" style="background:linear-gradient(135deg,#10b981,#059669)">🏆</div><h3>Thi thử</h3><p>Kiểm tra trình độ</p></div>
      </div>
    </div>`;
  },

  /* ========== Vocabulary ========== */
  viewVocabulary() {
    return `
    <div class="container">
      <div class="sec-head">
        <h2>📚 Từ vựng theo chủ đề</h2>
        <input class="input" style="max-width:300px" placeholder="🔍 Tìm từ..." value="${this.esc(this.state.vocabSearch)}" oninput="App.searchVocab(this.value)" maxlength="60">
      </div>
      <div class="pills">
        ${Object.keys(VOCAB).map(t => `<div class="pill ${this.state.vocabTopic === t ? 'active' : ''}" onclick="App.selectTopic('${t}')">${TOPIC_ICONS[t] || '📖'} ${t}</div>`).join('')}
      </div>
      <div class="grid g3" id="vocabGrid">${this.vocabCardsHTML()}</div>
    </div>`;
  },
  vocabCardsHTML() {
    const words = this.filteredVocab();
    if (!words.length) return `<div class="empty" style="grid-column:1/-1"><div class="icon">🔍</div><h3>Không tìm thấy</h3></div>`;
    return words.map(w => `
      <div class="glass vocab-card glass-round">
        <div class="de">${this.esc(w.de)}</div>
        <div class="ipa">${this.esc(w.ipa)}</div>
        <div class="vi">${this.esc(w.vi)}</div>
        <div class="ex">${this.esc(w.ex)}<div class="ex-vi">→ ${this.esc(w.exVi)}</div></div>
      </div>`).join('');
  },
  filteredVocab() {
    const words = VOCAB[this.state.vocabTopic] || [];
    const q = this.state.vocabSearch.toLowerCase().trim();
    if (!q) return words;
    return words.filter(w => w.de.toLowerCase().includes(q) || w.vi.toLowerCase().includes(q));
  },
  selectTopic(t) { this.state.vocabTopic = t; this.state.vocabSearch = ''; this.render(); },
  searchVocab(q) {
    this.state.vocabSearch = q;
    const g = document.getElementById('vocabGrid');
    if (g) g.innerHTML = this.vocabCardsHTML();
  },

  /* ========== Flashcards ========== */
  viewFlashcards() {
    if (!this.state.flashcardDeck.length) {
      this.state.flashcardDeck = [...(VOCAB[this.state.vocabTopic] || [])];
      this.state.flashcardIndex = 0;
    }
    const card = this.state.flashcardDeck[this.state.flashcardIndex];
    if (!card) return `<div class="container"><div class="empty"><div class="icon">🎴</div><h3>Chọn chủ đề</h3></div></div>`;
    return `
    <div class="container">
      <div class="sec-head"><h2>🎴 Flashcards</h2><p>${this.state.flashcardIndex + 1} / ${this.state.flashcardDeck.length}</p></div>
      <div class="pills">
        ${Object.keys(VOCAB).map(t => `<div class="pill ${this.state.vocabTopic === t ? 'active' : ''}" onclick="App.loadDeck('${t}')">${TOPIC_ICONS[t] || '📖'} ${t}</div>`).join('')}
      </div>
      <div style="max-width:540px;margin:0 auto">
        <div class="flashcard" id="flashcard" onclick="this.classList.toggle('flipped')">
          <div class="flashcard-inner">
            <div class="fc-face fc-front">
              <div class="de">${this.esc(card.de)}</div>
              <div class="ipa">${this.esc(card.ipa)}</div>
              <div class="hint">Click để xem nghĩa</div>
            </div>
            <div class="fc-face fc-back">
              <div class="vi">${this.esc(card.vi)}</div>
              <div class="ex">${this.esc(card.ex)}</div>
              <div class="ex-vi">${this.esc(card.exVi)}</div>
            </div>
          </div>
        </div>
        <div style="display:flex;gap:10px;margin-top:18px">
          <button class="btn btn-glass btn-block" onclick="App.prevCard()">← Trước</button>
          <button class="btn btn-primary btn-block" onclick="App.nextCard()">Sau →</button>
        </div>
      </div>
    </div>`;
  },
  loadDeck(t) { this.state.vocabTopic = t; this.state.flashcardDeck = [...VOCAB[t]]; this.state.flashcardIndex = 0; this.render(); },
  nextCard() { if (this.state.flashcardIndex < this.state.flashcardDeck.length - 1) { this.state.flashcardIndex++; this.render(); } else this.toast('Đã hết bộ thẻ 🎉', 'success'); },
  prevCard() { if (this.state.flashcardIndex > 0) { this.state.flashcardIndex--; this.render(); } },

  /* ========== Quiz ========== */
  viewQuiz() {
    if (!this.state.quizQuestions.length) this.startQuiz();
    const q = this.state.quizQuestions[this.state.quizIndex];
    if (!q) return this.quizResult();
    return `
    <div class="container">
      <div class="sec-head"><h2>🎯 Quiz nhanh</h2><p>Câu ${this.state.quizIndex + 1} / ${this.state.quizQuestions.length} — Điểm: ${this.state.quizScore}</p></div>
      <div style="max-width:620px;margin:0 auto">
        <div class="glass quiz-card glass-round">
          <div class="q-header"><span>Câu hỏi</span><span>${this.state.quizIndex + 1}/${this.state.quizQuestions.length}</span></div>
          <div class="progress" style="margin-bottom:16px"><div class="progress-bar" style="width:${(this.state.quizIndex / this.state.quizQuestions.length) * 100}%"></div></div>
          <div class="q-text">${this.esc(q.text)}</div>
          <div class="options">
            ${q.options.map((o, i) => `<button class="option" data-letter="${String.fromCharCode(65 + i)}" onclick="App.answerQuiz(${i})">${this.esc(o)}</button>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
  },
  startQuiz() {
    const all = []; Object.values(VOCAB).forEach(arr => arr.forEach(w => all.push(w)));
    const shuffle = a => a.sort(() => Math.random() - 0.5);
    const picked = shuffle([...all]).slice(0, 5);
    this.state.quizQuestions = picked.map(w => {
      const wrongs = shuffle([...all].filter(x => x.vi !== w.vi)).slice(0, 3).map(x => x.vi);
      const options = shuffle([w.vi, ...wrongs]);
      return { text: `Từ "${w.de}" có nghĩa là gì?`, options, correct: options.indexOf(w.vi) };
    });
    this.state.quizIndex = 0; this.state.quizScore = 0; this.state.quizAnswered = false;
  },
  answerQuiz(idx) {
    if (this.state.quizAnswered) return;
    this.state.quizAnswered = true;
    const q = this.state.quizQuestions[this.state.quizIndex];
    document.querySelectorAll('.option').forEach((o, i) => {
      o.classList.add('disabled');
      if (i === q.correct) o.classList.add('correct');
      else if (i === idx) o.classList.add('wrong');
    });
    if (idx === q.correct) this.state.quizScore++;
    setTimeout(() => {
      this.state.quizIndex++;
      this.state.quizAnswered = false;
      if (this.state.quizIndex >= this.state.quizQuestions.length) {
        this.state.quizQuestions = [];
        this.toast(`Hoàn thành! Điểm: ${this.state.quizScore}`, 'success');
      }
      this.render();
    }, 1200);
  },
  quizResult() {
    return `<div class="container"><div style="max-width:500px;margin:40px auto;text-align:center">
      <div class="glass glass-round" style="padding:44px 32px">
        <div style="font-size:64px;margin-bottom:12px">🎉</div>
        <h1 style="font-size:24px;margin-bottom:6px">Hoàn thành!</h1>
        <p style="color:var(--muted);margin-bottom:20px">Bạn đã hoàn thành quiz</p>
        <button class="btn btn-primary btn-lg" onclick="App.startQuiz();App.render()">Làm lại</button>
      </div>
    </div></div>`;
  },

  /* ========== Grammar ========== */
  viewGrammar() {
    if (this.state.grammarKey) {
      const g = GRAMMAR[this.state.grammarKey];
      return `
      <div class="container">
        <button class="btn btn-glass btn-sm" onclick="App.state.grammarKey=null;App.render()" style="margin-bottom:14px">← Quay lại</button>
        <div class="glass content-box glass-round">
          <span class="badge badge-red">${g.level}</span>
          <h2 style="margin-top:10px">${this.esc(g.title)}</h2>
          ${g.content}
        </div>
      </div>`;
    }
    return `
    <div class="container">
      <div class="sec-head"><h2>📖 Ngữ pháp tiếng Đức</h2><p>Chọn bài để xem chi tiết</p></div>
      <div class="grid g2">
        ${Object.entries(GRAMMAR).map(([k, g]) => `
          <div class="glass vocab-card glass-round" style="cursor:pointer" onclick="App.state.grammarKey='${k}';App.render()">
            <span class="badge badge-red">${g.level}</span>
            <div class="de" style="font-size:18px;margin-top:8px">${this.esc(g.title)}</div>
            <p style="color:var(--muted);font-size:13px;margin-top:6px">Click để đọc chi tiết →</p>
          </div>`).join('')}
      </div>
    </div>`;
  },

  /* ========== Exam ========== */
  viewExam() {
    if (!this.state.examActive) {
      return `<div class="container"><div class="glass glass-round" style="padding:44px 32px;text-align:center">
        <div style="font-size:56px;margin-bottom:12px">🏆</div>
        <h1 style="font-size:26px;margin-bottom:6px">Thi thử Goethe A1</h1>
        <p style="color:var(--muted);margin-bottom:22px;max-width:480px;margin-left:auto;margin-right:auto;font-size:14px">10 câu trắc nghiệm từ vựng • Thời gian 10 phút • Kết quả lưu vào hồ sơ</p>
        <button class="btn btn-primary btn-lg" onclick="App.startExam()">Bắt đầu thi</button>
      </div></div>`;
    }
    const mins = Math.floor(this.state.examTimeLeft / 60);
    const secs = this.state.examTimeLeft % 60;
    return `
    <div class="container">
      <div class="glass exam-header glass-round">
        <div><h2>🏆 Bài thi đang diễn ra</h2><div class="meta">10 câu • Trả lời rồi bấm nộp</div></div>
        <div class="timer ${this.state.examTimeLeft <= 60 ? 'warning' : ''}">⏱ ${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}</div>
      </div>
      ${this.state.examQuestions.map((q, i) => `
        <div class="glass glass-round" style="padding:22px 24px;margin-bottom:12px">
          <div class="qbody"><span class="qnum">${i + 1}</span><span>${this.esc(q.text)}</span></div>
          <div class="options">
            ${q.options.map((o, j) => `<button class="option ${this.state.examAnswers[i] === j ? 'correct' : ''}" onclick="App.selectExamAnswer(${i},${j})">${this.esc(o)}</button>`).join('')}
          </div>
        </div>`).join('')}
      <div style="text-align:center;padding:18px">
        <button class="btn btn-primary btn-lg" onclick="App.submitExam()">Nộp bài</button>
      </div>
    </div>`;
  },
  startExam() {
    const all = []; Object.values(VOCAB).forEach(arr => arr.forEach(w => all.push(w)));
    const shuffle = a => a.sort(() => Math.random() - 0.5);
    const picked = shuffle([...all]).slice(0, 10);
    this.state.examQuestions = picked.map(w => {
      const wrongs = shuffle([...all].filter(x => x.vi !== w.vi)).slice(0, 3).map(x => x.vi);
      const options = shuffle([w.vi, ...wrongs]);
      return { text: `Từ "${w.de}" có nghĩa là gì?`, options, correct: options.indexOf(w.vi) };
    });
    this.state.examAnswers = new Array(10).fill(-1);
    this.state.examActive = true;
    this.state.examTimeLeft = 600;
    this.render();
    this.state.examTimer = setInterval(() => {
      this.state.examTimeLeft--;
      const t = document.querySelector('.timer');
      if (t) {
        const m = Math.floor(this.state.examTimeLeft / 60);
        const s = this.state.examTimeLeft % 60;
        t.textContent = `⏱ ${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
        if (this.state.examTimeLeft <= 60) t.classList.add('warning');
      }
      if (this.state.examTimeLeft <= 0) {
        clearInterval(this.state.examTimer);
        this.state.examTimer = null;
        this.submitExam(true);
      }
    }, 1000);
  },
  selectExamAnswer(qi, oi) { this.state.examAnswers[qi] = oi; this.render(); },
  async submitExam(auto = false) {
    if (this.state.examTimer) { clearInterval(this.state.examTimer); this.state.examTimer = null; }
    const score = this.state.examQuestions.reduce((s, q, i) => s + (this.state.examAnswers[i] === q.correct ? 1 : 0), 0);
    try {
      await UserDB.put('examResults', {
        email: this.state.user.email,
        score, total: 10,
        date: Date.now(),
        autoSubmitted: auto
      });
    } catch {}
    this.state.examActive = false;
    this.toast(`Nộp bài! Điểm: ${score}/10`, score >= 7 ? 'success' : score >= 5 ? '' : 'error');
    this.render();
    setTimeout(() => {
      this.openModal(`
        <div class="modal-head"><h3>Kết quả bài thi</h3><button class="modal-close" onclick="App.closeModal()">×</button></div>
        <div class="modal-body" style="text-align:center">
          <div style="font-size:56px;margin-bottom:10px">${score >= 7 ? '🎉' : score >= 5 ? '👍' : '💪'}</div>
          <div style="font-size:44px;font-weight:900;color:var(--red);font-family:'Plus Jakarta Sans',sans-serif">${score}/10</div>
          <p style="margin-top:6px;color:var(--muted)">${score >= 7 ? 'Xuất sắc!' : score >= 5 ? 'Khá tốt, cần ôn thêm.' : 'Cần cố gắng hơn!'}</p>
        </div>
        <div class="modal-foot">
          <button class="btn btn-glass" onclick="App.closeModal()">Đóng</button>
          <button class="btn btn-primary" onclick="App.closeModal();App.startExam()">Làm lại</button>
        </div>`);
    }, 300);
  },

  /* ========== Profile ========== */
  async viewProfile() {
    const u = this.state.user;
    const p = await UserDB.get('progress', u.email) || {};
    const exams = await UserDB.getAll('examResults');
    const mine = exams.filter(e => e.email === u.email);
    return `
    <div class="container">
      <div class="glass hero-card" style="display:flex;gap:22px;align-items:center;flex-wrap:wrap">
        <div class="avatar xl">${this.initial(u.name)}</div>
        <div style="flex:1;min-width:220px">
          <h1 style="font-size:26px;margin-bottom:4px">${this.esc(u.name)}</h1>
          <p style="color:var(--muted);margin-bottom:8px;font-size:13.5px">${this.esc(u.email)}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            <span class="badge ${u.role === 'admin' ? 'badge-red' : 'badge-blue'}">${u.role === 'admin' ? '⚡ Admin' : '👤 Học viên'}</span>
            <span class="badge badge-green">🔥 Streak ${p.streak || 1} ngày</span>
          </div>
        </div>
      </div>
      <div class="grid g3" style="margin-top:18px">
        <div class="glass stat-card glass-round"><div class="lbl">Bài thi</div><div class="val">${mine.length}</div></div>
        <div class="glass stat-card glass-round"><div class="lbl">Điểm cao nhất</div><div class="val">${mine.length ? Math.max(...mine.map(e => e.score)) + '/10' : '—'}</div></div>
        <div class="glass stat-card glass-round"><div class="lbl">Tham gia</div><div class="val" style="font-size:15px">${new Date(u.createdAt).toLocaleDateString('vi-VN')}</div></div>
      </div>
      ${mine.length ? `
      <div class="sec-head" style="margin-top:22px"><h2>📊 Lịch sử thi</h2></div>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Ngày</th><th>Điểm</th><th>Ghi chú</th></tr></thead>
          <tbody>${mine.slice().reverse().map(e => `
            <tr>
              <td>${new Date(e.date).toLocaleString('vi-VN')}</td>
              <td><span class="badge ${e.score >= 7 ? 'badge-green' : e.score >= 5 ? 'badge-amber' : 'badge-red'}">${e.score}/10</span></td>
              <td>${e.autoSubmitted ? 'Hết giờ' : 'Hoàn thành'}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>` : `<div class="empty"><div class="icon">🏆</div><h3>Chưa có bài thi</h3><p>Bắt đầu thi thử để ghi lại điểm</p></div>`}
    </div>`;
  },

  /* ========== Admin ========== */
  async viewAdmin() {
    if (this.state.user.role !== 'admin') return this.viewDashboard();
    const tab = this.state.adminTab;
    const users = await UserDB.getAll('users');
    const exams = await UserDB.getAll('examResults');
    const anns = await ContentDB.getAll('announcements');

    return `
    <div class="container">
      <div class="glass hero-card">
        <h1>⚡ Admin Panel</h1>
        <p>Chào mừng quản trị viên <strong>${this.esc(this.state.user.name)}</strong>. Quản lý hệ thống tại đây.</p>
      </div>
      <div class="stats-grid">
        <div class="glass stat-card glass-round"><div class="lbl">Tổng users</div><div class="val">${users.length}</div></div>
        <div class="glass stat-card glass-round"><div class="lbl">Bài thi</div><div class="val">${exams.length}</div></div>
        <div class="glass stat-card glass-round"><div class="lbl">Thông báo</div><div class="val">${anns.length}</div></div>
        <div class="glass stat-card glass-round"><div class="lbl">Từ vựng</div><div class="val">${Object.values(VOCAB).reduce((s, a) => s + a.length, 0)}</div></div>
      </div>
      <div class="tabs">
        <button class="tab ${tab === 'users' ? 'active' : ''}" onclick="App.state.adminTab='users';App.render()">👥 Người dùng</button>
        <button class="tab ${tab === 'announcements' ? 'active' : ''}" onclick="App.state.adminTab='announcements';App.render()">📢 Thông báo</button>
        <button class="tab ${tab === 'data' ? 'active' : ''}" onclick="App.state.adminTab='data';App.render()">💾 Dữ liệu</button>
      </div>
      ${tab === 'users' ? this.adminUsersTab(users) : ''}
      ${tab === 'announcements' ? this.adminAnnTab(anns) : ''}
      ${tab === 'data' ? this.adminDataTab() : ''}
    </div>`;
  },
  adminUsersTab(users) {
    const ADMIN_ID = 'vanbacazerst.vn2908';
    return `
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Họ tên</th><th>Email / ID</th><th>Vai trò</th><th>Ngày tạo</th><th>Hành động</th></tr></thead>
        <tbody>${users.map(u => `
          <tr>
            <td><strong>${this.esc(u.name)}</strong></td>
            <td>${this.esc(u.email)}</td>
            <td><span class="badge ${u.role === 'admin' ? 'badge-red' : 'badge-blue'}">${u.role}</span></td>
            <td>${new Date(u.createdAt).toLocaleDateString('vi-VN')}</td>
            <td>
              ${u.email === ADMIN_ID ? '<span style="color:var(--muted);font-size:11px">Root Admin</span>' :
                u.role === 'admin' ? `<button class="btn btn-glass btn-sm" onclick="App.adminDemote('${this.esc(u.email)}')">Hạ cấp</button>` :
                `<button class="btn btn-glass btn-sm" onclick="App.adminPromote('${this.esc(u.email)}')">Thăng admin</button>`}
              ${u.email !== ADMIN_ID ? `<button class="btn btn-danger btn-sm" style="margin-left:6px" onclick="App.adminDelUser('${this.esc(u.email)}')">Xóa</button>` : ''}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
  },
  adminAnnTab(anns) {
    return `
    <div style="margin-bottom:14px;text-align:right"><button class="btn btn-primary" onclick="App.adminAddAnn()">+ Thêm thông báo</button></div>
    ${anns.length ? `<div class="grid g2">${anns.slice().reverse().map(a => `
      <div class="glass glass-round" style="padding:20px 22px">
        <div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:8px">
          <strong style="font-size:14.5px">${this.esc(a.title)}</strong>
          <button class="btn btn-danger btn-sm" onclick="App.adminDelAnn(${a.id})">Xóa</button>
        </div>
        <p style="color:var(--muted);font-size:13px;line-height:1.6">${this.esc(a.content)}</p>
        <div style="font-size:11px;color:var(--light);margin-top:6px">${new Date(a.createdAt).toLocaleString('vi-VN')}</div>
      </div>`).join('')}</div>` : `<div class="empty"><div class="icon">📢</div><h3>Chưa có thông báo</h3></div>`}`;
  },
  adminDataTab() {
    return `
    <div class="grid g2">
      <div class="glass glass-round" style="padding:22px">
        <h3 style="margin-bottom:6px">📥 Export dữ liệu</h3>
        <p style="color:var(--muted);font-size:13px;margin-bottom:14px">Xuất toàn bộ tài khoản (JSON) để backup</p>
        <button class="btn btn-primary" onclick="App.adminExport()">Export JSON</button>
      </div>
      <div class="glass glass-round" style="padding:22px">
        <h3 style="margin-bottom:6px">📤 Import dữ liệu</h3>
        <p style="color:var(--muted);font-size:13px;margin-bottom:14px">Khôi phục tài khoản từ file backup</p>
        <input type="file" accept=".json" id="importFile" class="input" style="margin-bottom:8px">
        <button class="btn btn-glass" onclick="App.adminImport()">Import</button>
      </div>
      <div class="glass glass-round" style="padding:22px;border:2px solid rgba(239,68,68,.3)">
        <h3 style="margin-bottom:6px;color:var(--danger)">⚠️ Reset Content DB</h3>
        <p style="color:var(--muted);font-size:13px;margin-bottom:14px">Xóa thông báo. Tài khoản vẫn an toàn (DB riêng).</p>
        <button class="btn btn-danger" onclick="App.adminResetContent()">Reset Content</button>
      </div>
      <div class="glass glass-round" style="padding:22px">
        <h3 style="margin-bottom:6px">🔒 Bảo mật</h3>
        <p style="color:var(--muted);font-size:13px;line-height:1.8">
          • Hash: SHA-256 + salt + 50 iter<br>
          • Rate limit: 5 lần / 5 phút<br>
          • Session: 7 ngày sliding<br>
          • 2 DB: <code>Users</code> + <code>Content</code>
        </p>
      </div>
    </div>`;
  },
  async adminPromote(email) {
    if (!Sanitizer.isEmail(email) && !email.startsWith('vanbac')) return;
    const u = await UserDB.get('users', email);
    if (!u) return;
    u.role = 'admin';
    await UserDB.put('users', u);
    this.toast('Đã thăng cấp admin', 'success');
    this.render();
  },
  async adminDemote(email) {
    const u = await UserDB.get('users', email);
    if (!u) return;
    u.role = 'user';
    await UserDB.put('users', u);
    this.toast('Đã hạ cấp', 'success');
    this.render();
  },
  async adminDelUser(email) {
    if (!confirm(`Xóa user ${email}?`)) return;
    try {
      await UserDB.del('users', email);
      await UserDB.del('progress', email);
      this.toast('Đã xóa', 'success');
      this.render();
    } catch { this.toast('Lỗi xóa', 'error'); }
  },
  adminAddAnn() {
    this.openModal(`
      <div class="modal-head"><h3>Thêm thông báo</h3><button class="modal-close" onclick="App.closeModal()">×</button></div>
      <div class="modal-body">
        <div class="form-group"><label>Tiêu đề</label>
          <input class="input" id="ann-title" placeholder="Tiêu đề" maxlength="100"></div>
        <div class="form-group"><label>Nội dung</label>
          <textarea class="input" id="ann-content" placeholder="Nội dung..." maxlength="1000"></textarea></div>
      </div>
      <div class="modal-foot">
        <button class="btn btn-glass" onclick="App.closeModal()">Hủy</button>
        <button class="btn btn-primary" onclick="App.saveAnn()">Lưu</button>
      </div>`);
  },
  async saveAnn() {
    const title = Sanitizer.clean(document.getElementById('ann-title').value, 100);
    const content = Sanitizer.clean(document.getElementById('ann-content').value, 1000);
    if (!title || !content) return this.toast('Nhập đủ thông tin', 'error');
    try {
      await ContentDB.put('announcements', { title, content, createdAt: Date.now() });
      this.closeModal();
      this.toast('Đã thêm', 'success');
      this.render();
    } catch { this.toast('Lỗi lưu', 'error'); }
  },
  async adminDelAnn(id) {
    if (!confirm('Xóa thông báo này?')) return;
    await ContentDB.del('announcements', id);
    this.toast('Đã xóa', 'success');
    this.render();
  },
  async adminExport() {
    try {
      const data = {
        users: await UserDB.getAll('users'),
        progress: await UserDB.getAll('progress'),
        exams: await UserDB.getAll('examResults'),
        anns: await ContentDB.getAll('announcements'),
        exportedAt: Date.now(),
        version: 'v1'
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `deutschlern-backup-${Date.now()}.json`;
      a.click();
      URL.revokeObjectURL(url);
      this.toast('Đã export!', 'success');
    } catch { this.toast('Lỗi export', 'error'); }
  },
  async adminImport() {
    const file = document.getElementById('importFile').files[0];
    if (!file) return this.toast('Chọn file trước', 'error');
    try {
      const data = JSON.parse(await file.text());
      if (data.users) for (const u of data.users) await UserDB.put('users', u);
      if (data.progress) for (const p of data.progress) await UserDB.put('progress', p);
      if (data.exams) for (const e of data.exams) { delete e.id; await UserDB.put('examResults', e); }
      if (data.anns) for (const a of data.anns) { delete a.id; await ContentDB.put('announcements', a); }
      this.toast('Import thành công!', 'success');
      this.render();
    } catch { this.toast('File không hợp lệ', 'error'); }
  },
  async adminResetContent() {
    if (!confirm('Reset toàn bộ content DB (thông báo)?')) return;
    await ContentDB.clear('announcements');
    this.toast('Đã reset content', 'success');
    this.render();
  }
};

/* ========== Boot ========== */
App.init().catch(err => {
  console.error('[DeutschLern] Init error:', err);
  document.getElementById('app').innerHTML =
    `<div style="padding:40px;text-align:center;color:#d93828">
      <h1>Lỗi khởi tạo</h1>
      <p>${Sanitizer.esc(err.message || 'Unknown')}</p>
      <p style="font-size:13px;color:#64748b;margin-top:12px">Mở F12 → Console để xem chi tiết</p>
    </div>`;
}); 
