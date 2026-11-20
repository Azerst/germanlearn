/* =========================================================
   App Controller — Giao diện + logic (không chứa DB)
   ========================================================= */
window.App = {
  state: {
    user: null,
    view: 'home',
    pendingRoute: null,
    
    // Cũ
    vocabTopic: 'Gia đình',
    vocabSearch: '',
    
    // Từ điển & Động từ
    dictSearch: '',
    dictLetter: '',
    verbSearch: '',
    
    // Chế độ học
    studySet: 'words', // 'words' | 'verbs'
    studyMode: 'quiz', // 'quiz' | 'typing'
    studyDirection: 'de-vi', // 'de-vi' | 'vi-de'
    studyList: [],
    studyIdx: 0,
    studyScore: 0,
    studyAnswered: false,
    studyCorrectAns: '',
    studyOptions: [],
    
    // Khác
    adminTab: 'users',
    _toastTimer: null
  },

  async init() {
    try {
      const ic = IntegrityCheck.run();
      if (!ic.ok) throw new Error('Thiếu module: ' + ic.missing.join(', '));

      await DBHelper.init();

      const session = SessionManager.get();
      if (session) {
        try {
          const user = await UserDB.get('users', session.email);
          if (user) this.state.user = user;
          else SessionManager.clear();
        } catch { SessionManager.clear(); }
      }

      setInterval(() => { if (this.state.user) SessionManager.refresh(); }, 60000);

      this.state.view = 'home';
      this.render();
    } catch (err) { this.showInitError(err); }
  },

  showInitError(err) {
    const msg = Sanitizer.esc(String((err && err.message) || err));
    document.getElementById('app').innerHTML = `
      <div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;font-family:system-ui">
        <div style="max-width:540px;width:100%;background:#fff;border-radius:16px;padding:32px;box-shadow:0 10px 40px rgba(0,0,0,.1);border:2px solid #ef4444">
          <div style="font-size:48px;text-align:center;margin-bottom:12px">⚠️</div>
          <h1 style="color:#d93828;font-size:22px;margin-bottom:8px;text-align:center">Không thể khởi tạo</h1>
          <div style="background:#fef2f2;border-left:4px solid #ef4444;padding:12px 16px;border-radius:8px;margin:16px 0">
            <code style="font-size:12px;color:#7f1d1d;word-break:break-all">${msg}</code>
          </div>
          <button onclick="location.reload()" style="width:100%;padding:11px;background:#d93828;color:#fff;border:none;border-radius:10px;font-weight:600;cursor:pointer">Tải lại</button>
        </div>
      </div>`;
  },

  esc(s) { return Sanitizer.esc(s); },
  initial(n) { return (n || 'U').trim().charAt(0).toUpperCase(); },

  toast(msg, type = '') {
    const el = document.getElementById('toast');
    if(!el) return;
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

  /* ========== Router ========== */
  go(view) {
    const protectedViews = ['dashboard', 'vocabulary', 'dictionary', 'verbs', 'study', 'profile', 'admin'];

    if (protectedViews.includes(view)) {
      if (!this.state.user) {
        this.state.pendingRoute = view;
        this.state.view = 'login';
        this.render();
        this.toast('Vui lòng đăng nhập', 'warning');
        return;
      }
      SessionManager.refresh();
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

    const rl = RateLimiter.check(id);
    if (rl.locked) return this.toast(`Tài khoản bị khóa. Thử lại sau ${rl.remaining} phút`, 'error');

    try {
      const user = await UserDB.get('users', id);
      const ok = user && DBHelper.verify(pw, user.password);
      if (!ok) {
        const f = RateLimiter.fail(id);
        const left = RateLimiter.MAX_ATTEMPTS - (f.attempts || 0);
        if (f.lockUntil) return this.toast(`Sai quá nhiều lần. Khóa ${RateLimiter.LOCK_MINUTES} phút`, 'error');
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
    } catch (err) { this.toast('Lỗi đăng nhập.', 'error'); }
  },

  async register() {
    const name = Sanitizer.clean(document.getElementById('reg-name').value, 60);
    const email = Sanitizer.clean(document.getElementById('reg-email').value, 100).toLowerCase();
    const pw = document.getElementById('reg-pw').value;
    const pw2 = document.getElementById('reg-pw2').value;

    if (!name || !email || !pw) return this.toast('Nhập đủ thông tin', 'error');
    if (!Sanitizer.isEmail(email)) return this.toast('Email không hợp lệ', 'error');
    if (!Sanitizer.isStrongPassword(pw)) return this.toast('Mật khẩu ≥ 8 ký tự, có chữ hoa, chữ thường và số', 'error');
    if (pw !== pw2) return this.toast('Mật khẩu không khớp', 'error');

    try {
      if (await UserDB.get('users', email)) return this.toast('Email đã tồn tại', 'error');
      const salt = DBHelper.genSalt();
      const user = { email, name, role: 'user', password: DBHelper.hash(pw, salt), createdAt: Date.now() };
      await UserDB.put('users', user);
      await UserDB.put('progress', { email, completed: 0, streak: 1, lastVisit: Date.now() });

      SessionManager.set(email);
      this.state.user = user;
      const dest = this.state.pendingRoute || 'dashboard';
      this.state.pendingRoute = null;
      this.state.view = dest;
      this.render();
      this.toast('Đăng ký thành công!', 'success');
    } catch (err) { this.toast('Lỗi đăng ký', 'error'); }
  },

  logout() {
    if (!confirm('Đăng xuất?')) return;
    SessionManager.clear();
    this.state.user = null;
    this.state.view = 'home';
    this.render();
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
    if (!u) {
      return `
      <nav class="nav">
        <div class="nav-inner">
          <div class="logo" onclick="App.go('home')"><div class="logo-icon">DL</div><div>DeutschLern</div></div>
          <div class="nav-actions">
            <button class="btn btn-glass btn-sm" onclick="App.go('login')">Đăng nhập</button>
            <button class="btn btn-primary btn-sm" onclick="App.go('register')">Đăng ký</button>
          </div>
        </div>
      </nav>`;
    }

    const items = [
      ['dashboard', 'Trang chủ'], 
      ['vocabulary', 'Từ vựng'], 
      ['dictionary', 'Từ điển'],
      ['verbs', 'Động từ'],
      ['study', 'Học'],
      ['profile', 'Cá nhân']
    ];
    return `
      <nav class="nav">
        <div class="nav-inner">
          <div class="logo" onclick="App.go('dashboard')"><div class="logo-icon">DL</div><div>DeutschLern</div></div>
          <div class="nav-links" id="navLinks">
            ${items.map(([v, t]) => `<button class="${this.state.view === v ? 'active' : ''}" onclick="App.go('${v}')">${t}</button>`).join('')}
            ${u.role === 'admin' ? `<button class="admin-btn ${this.state.view === 'admin' ? 'active' : ''}" onclick="App.go('admin')">⚡ Admin</button>` : ''}
          </div>
          <div class="nav-actions">
            <div class="user-chip" onclick="App.go('profile')">
              <div class="avatar" style="background:${u.theme || 'var(--red)'}">${this.initial(u.name)}</div>
            </div>
            <button class="btn btn-glass btn-sm" onclick="App.logout()">Đăng xuất</button>
          </div>
        </div>
      </nav>`;
  },

  footer() { return `<footer class="footer"><div class="footer-bottom">© ${new Date().getFullYear()} DeutschLern</div></footer>`; },

  /* ========== Render ========== */
  async render() {
    const app = document.getElementById('app');
    const v = this.state.view;
    const publicViews = ['home', 'login', 'register'];

    if (!this.state.user && !publicViews.includes(v)) this.state.view = 'login';

    let html = '';
    if (v === 'home') html = this.nav() + this.viewHome() + this.footer();
    else if (v === 'login' || v === 'register') html = this.nav() + (v === 'login' ? this.viewLogin() : this.viewRegister());
    else {
      const content = await this.viewContent();
      html = this.nav() + `<main>${content}</main>`;
    }
    app.innerHTML = html;
  },

  async viewContent() {
    switch (this.state.view) {
      case 'dashboard': return await this.viewDashboard();
      case 'vocabulary': return this.viewVocabulary();
      case 'dictionary': return this.viewDictionary();
      case 'verbs': return this.viewVerbs();
      case 'study': return this.viewStudy();
      case 'profile': return await this.viewProfile();
      case 'admin': return await this.viewAdmin();
      default: return await this.viewDashboard();
    }
  },

  /* ========== Home / Auth / Dashboard ========== */
  viewHome() { return `<main><div class="container"><h1>Chào mừng đến DeutschLern</h1></div></main>`; },
  viewLogin() { return `<div class="auth-page"><div class="glass auth-card glass-round"><h1>Đăng nhập</h1><div class="form-group"><input class="input" id="login-id" placeholder="Email"></div><div class="form-group"><input class="input" id="login-pw" type="password" placeholder="Mật khẩu"></div><button class="btn btn-primary btn-block" onclick="App.login()">Đăng nhập</button><div class="auth-foot"><a onclick="App.go('register')">Đăng ký</a></div></div></div>`; },
  viewRegister() { return `<div class="auth-page"><div class="glass auth-card glass-round"><h1>Đăng ký</h1><div class="form-group"><input class="input" id="reg-name" placeholder="Họ tên"></div><div class="form-group"><input class="input" id="reg-email" placeholder="Email"></div><div class="form-group"><input class="input" id="reg-pw" type="password" placeholder="Mật khẩu"></div><div class="form-group"><input class="input" id="reg-pw2" type="password" placeholder="Nhập lại mật khẩu"></div><button class="btn btn-primary btn-block" onclick="App.register()">Đăng ký</button></div></div>`; },
  async viewDashboard() { return `<div class="container"><h1>Dashboard</h1><p>Chào mừng ${this.esc(this.state.user.name)}</p></div>`; },

  /* ========== Vocabulary ========== */
  viewVocabulary() {
    return `
    <div class="container">
      <div class="sec-head"><h2>📚 Từ vựng theo chủ đề</h2></div>
      <div class="grid g3">
        ${(VOCAB[this.state.vocabTopic] || []).map(w => `
          <div class="glass vocab-card glass-round">
            <div class="de">${this.esc(w.de)}</div>
            <div class="ipa">${this.esc(w.ipa)}</div>
            <div class="vi">${this.esc(w.vi)}</div>
          </div>`).join('')}
      </div>
    </div>`;
  },

  /* ========== Dictionary ========== */
  viewDictionary() {
    const q = (this.state.dictSearch || '').toLowerCase();
    const letter = this.state.dictLetter;
    
    let filtered = window.FLAT_VOCAB.filter(w => {
      const matchSearch = !q || w.de.toLowerCase().includes(q) || w.vi.toLowerCase().includes(q);
      const cleanDe = w.de.replace(/^(der|die|das)\s+/i, '').toUpperCase();
      const matchLetter = !letter || cleanDe.startsWith(letter);
      return matchSearch && matchLetter;
    });

    return `
    <div class="container">
      <div class="sec-head"><h2>📖 Từ điển (${window.FLAT_VOCAB.length} từ)</h2></div>
      <div class="glass glass-round" style="padding:20px;margin-bottom:20px">
        <input class="input" style="margin-bottom:10px" placeholder="🔍 Tìm từ Đức hoặc nghĩa tiếng Việt..." 
          value="${this.esc(this.state.dictSearch)}" 
          oninput="App.state.dictSearch=this.value; App.render()">
        <div style="display:flex;gap:10px">
          <select class="input" onchange="App.state.dictLetter=this.value; App.render()">
            <option value="">-- Tất cả chữ cái --</option>
            ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(x => `<option ${letter === x ? 'selected' : ''}>${x}</option>`).join('')}
          </select>
          <button class="btn btn-glass" onclick="App.state.dictSearch=''; App.state.dictLetter=''; App.render()">Xóa lọc</button>
        </div>
        <p class="muted" style="margin-top:10px;font-size:13px">Hiển thị: ${filtered.length} kết quả</p>
      </div>
      
      <div class="dict-list">
        ${filtered.slice(0, 300).map(w => `
          <div class="dict-item glass-round">
            <div>
              <div class="de">${this.esc(w.de)}</div>
              <span class="ipa">${this.esc(w.ipa)}</span>
            </div>
            <div class="vi">${this.esc(w.vi)}</div>
          </div>
        `).join('')}
        ${filtered.length > 300 ? '<p style="text-align:center;padding:10px">... (Hiển thị tối đa 300 từ)</p>' : ''}
      </div>
    </div>`;
  },

  /* ========== Verbs ========== */
  viewVerbs() {
    const q = (this.state.verbSearch || '').toLowerCase();
    const filtered = window.IRREGULAR_VERBS.filter(v => 
      !q || [v.inf, v.prat, v.perf, v.vi].some(s => s.toLowerCase().includes(q))
    );

    return `
    <div class="container">
      <div class="sec-head"><h2>📖 Động từ bất quy tắc (${window.IRREGULAR_VERBS.length})</h2></div>
      <div class="glass glass-round" style="padding:20px;margin-bottom:20px">
        <input class="input" placeholder="🔍 Tìm động từ, dạng chia hoặc nghĩa..." 
          value="${this.esc(this.state.verbSearch)}" 
          oninput="App.state.verbSearch=this.value; App.render()">
      </div>
      
      <div class="dict-list">
        ${filtered.map(v => `
          <div class="verb-item glass-round">
            <div class="main-info">
              <div class="inf">${this.esc(v.inf)}</div>
              <div class="mean">${this.esc(v.vi)}</div>
            </div>
            <div class="forms">
              <div class="form-badge"><b>Prät:</b> ${this.esc(v.prat)}</div>
              <div class="form-badge"><b>Perf:</b> ${this.esc(v.perf)}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>`;
  },

  /* ========== Study Mode ========== */
  viewStudy() {
    if (this.state.studyList.length === 0) {
      return `
      <div class="container">
        <div class="study-setup glass glass-round">
          <h2 style="margin-bottom:20px;text-align:center">⚙️ Thiết lập chế độ học</h2>
          <div class="form-group">
            <label>Chọn nội dung học</label>
            <select class="input" id="study-set">
              <option value="words" ${this.state.studySet === 'words' ? 'selected' : ''}>Từ vựng (Từ điển)</option>
              <option value="verbs" ${this.state.studySet === 'verbs' ? 'selected' : ''}>Động từ bất quy tắc</option>
            </select>
          </div>
          <div class="form-group">
            <label>Hình thức kiểm tra</label>
            <select class="input" id="study-mode">
              <option value="quiz" ${this.state.studyMode === 'quiz' ? 'selected' : ''}>Trắc nghiệm A-B-C-D</option>
              <option value="typing" ${this.state.studyMode === 'typing' ? 'selected' : ''}>Gõ đáp án</option>
            </select>
          </div>
          <div class="form-group">
            <label>Chiều học (Áp dụng cho Từ vựng)</label>
            <select class="input" id="study-dir">
              <option value="de-vi" ${this.state.studyDirection === 'de-vi' ? 'selected' : ''}>Đức → Việt</option>
              <option value="vi-de" ${this.state.studyDirection === 'vi-de' ? 'selected' : ''}>Việt → Đức</option>
            </select>
          </div>
          <button class="btn btn-primary btn-block btn-lg" onclick="App.startStudy()" style="margin-top:10px">Bắt đầu học</button>
        </div>
      </div>`;
    }

    if (this.state.studyIdx >= this.state.studyList.length) {
      return `
      <div class="container">
        <div class="glass glass-round" style="padding:40px;text-align:center;max-width:500px;margin:40px auto">
          <div style="font-size:64px;margin-bottom:10px">🎉</div>
          <h2>Hoàn thành!</h2>
          <p style="margin:10px 0 20px;font-size:18px">Bạn trả lời đúng <strong>${this.state.studyScore}/${this.state.studyList.length}</strong> câu.</p>
          <button class="btn btn-primary" onclick="App.state.studyList=[]; App.render()">Học lại</button>
        </div>
      </div>`;
    }

    const item = this.state.studyList[this.state.studyIdx];
    let qText = '';
    if (this.state.studySet === 'words') {
      qText = this.state.studyDirection === 'de-vi' ? item.de : item.vi;
    } else {
      qText = `${item.inf} (${item.vi}) — Chia dạng <b>${this.state.studyDirection === 'de-vi' ? 'Präteritum' : 'Perfekt'}</b>`;
    }

    return `
    <div class="container">
      <div style="max-width:600px;margin:0 auto">
        <div class="sec-head">
          <h2>Chế độ học</h2>
          <p>Câu ${this.state.studyIdx + 1}/${this.state.studyList.length} · Điểm: ${this.state.studyScore}</p>
        </div>
        
        <div class="glass glass-round" style="padding:30px">
          <h3 style="font-size:24px;text-align:center;margin-bottom:20px;line-height:1.4">${qText}</h3>
          
          ${this.state.studyMode === 'quiz' ? `
            <div class="quiz-options">
              ${this.state.studyOptions.map((opt, i) => `
                <button class="quiz-opt" data-i="${i}" onclick="App.checkStudyAnswer('${this.esc(opt)}', this)">
                  <b>${'ABCD'[i]}</b> <span>${this.esc(opt)}</span>
                </button>
              `).join('')}
            </div>
          ` : `
            <div class="study-input-wrapper">
              <input type="text" id="study-input" class="input" placeholder="Nhập đáp án..." autocomplete="off" 
                onkeydown="if(event.key==='Enter')App.checkStudyAnswer(this.value)">
              <button class="btn btn-primary" onclick="App.checkStudyAnswer(document.getElementById('study-input').value)">Kiểm tra</button>
            </div>
          `}
          
          <div id="study-feedback" class="study-feedback"></div>
        </div>
      </div>
    </div>`;
  },

  startStudy() {
    this.state.studySet = document.getElementById('study-set').value;
    this.state.studyMode = document.getElementById('study-mode').value;
    this.state.studyDirection = document.getElementById('study-dir').value;

    const pool = this.state.studySet === 'words' ? window.FLAT_VOCAB : window.IRREGULAR_VERBS;
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, 20);
    
    this.state.studyList = shuffled;
    this.state.studyIdx = 0;
    this.state.studyScore = 0;
    this.state.studyAnswered = false;
    
    this.prepareStudyQuestion();
    this.render();
  },

  prepareStudyQuestion() {
    const item = this.state.studyList[this.state.studyIdx];
    let correct, poolOpts;
    
    if (this.state.studySet === 'words') {
      correct = this.state.studyDirection === 'de-vi' ? item.vi : item.de;
      poolOpts = window.FLAT_VOCAB.filter(w => w.id !== item.id).map(w => this.state.studyDirection === 'de-vi' ? w.vi : w.de);
    } else {
      const isPrat = Math.random() < 0.5;
      this.state.studyDirection = isPrat ? 'de-vi' : 'vi-de';
      correct = isPrat ? item.prat : item.perf;
      poolOpts = window.IRREGULAR_VERBS.filter(v => v.id !== item.id).map(v => isPrat ? v.prat : v.perf);
    }
    
    this.state.studyCorrectAns = correct;
    const wrongs = [...new Set(poolOpts.filter(o => o !== correct))].sort(() => Math.random() - 0.5).slice(0, 3);
    this.state.studyOptions = [...wrongs, correct].sort(() => Math.random() - 0.5);
    this.state.studyAnswered = false;
  },

  normalizeStr(s) {
    return String(s).toLowerCase().trim()
      .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
      .replace(/[.,!?;()]/g, '').replace(/\s+/g, ' ')
      .replace(/^(der|die|das)\s+/, '');
  },

  checkStudyAnswer(userVal, btnEl = null) {
    if (this.state.studyAnswered) return;
    this.state.studyAnswered = true;

    const isCorrect = this.normalizeStr(userVal) === this.normalizeStr(this.state.studyCorrectAns);
    if (isCorrect) this.state.studyScore++;

    if (btnEl) {
      document.querySelectorAll('.quiz-opt').forEach(b => {
        b.disabled = true;
        const txt = b.querySelector('span').textContent;
        if (this.normalizeStr(txt) === this.normalizeStr(this.state.studyCorrectAns)) b.classList.add('correct');
        if (b === btnEl && !isCorrect) b.classList.add('wrong');
      });
    }

    const fb = document.getElementById('study-feedback');
    fb.className = `study-feedback ${isCorrect ? 'ok' : 'fail'}`;
    fb.innerHTML = `${isCorrect ? '✅ Chính xác!' : '❌ Chưa đúng.'} ${!isCorrect ? `<br>Đáp án: <b>${this.esc(this.state.studyCorrectAns)}</b>` : ''}
      <br><button class="btn btn-primary btn-sm" style="margin-top:10px" onclick="App.nextStudyQuestion()">${this.state.studyIdx === this.state.studyList.length - 1 ? 'Xem kết quả' : 'Tiếp tục →'}</button>`;
  },

  nextStudyQuestion() {
    this.state.studyIdx++;
    if (this.state.studyIdx < this.state.studyList.length) {
      this.prepareStudyQuestion();
    }
    this.render();
  },

  /* ========== Admin ========== */
  async viewAdmin() {
    if (this.state.user.role !== 'admin') return this.viewDashboard();
    const tab = this.state.adminTab;
    const users = await UserDB.getAll('users');
    return `
    <div class="container">
      <h1>⚡ Admin Panel</h1>
      ${this.adminUsersTab(users)}
    </div>`;
  },
  
  adminUsersTab(users) {
    const ADMIN_ID = 'vanbacazerst.vn2908';
    return `
    <div class="table-wrap">
      <table class="table">
        <thead><tr><th>Họ tên</th><th>Email / ID</th><th>Vai trò</th><th>Hành động</th></tr></thead>
        <tbody>${users.map(u => `
          <tr>
            <td><strong>${this.esc(u.name)}</strong></td>
            <td>${this.esc(u.email)}</td>
            <td><span class="badge ${u.role === 'admin' ? 'badge-red' : 'badge-blue'}">${u.role}</span></td>
            <td>
              <button class="btn btn-glass btn-sm" onclick="App.adminViewUser('${this.esc(u.email)}')">🔍 Chi tiết</button>
              ${u.email !== ADMIN_ID ? `<button class="btn btn-danger btn-sm" style="margin-left:6px" onclick="App.adminDelUser('${this.esc(u.email)}')">Xóa</button>` : ''}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
  },

  async adminViewUser(email) {
    const u = await UserDB.get('users', email);
    const p = await UserDB.get('progress', email) || { completed: 0, streak: 0 };
    const exams = await UserDB.getAll('examResults');
    const myExams = exams.filter(e => e.email === email);

    this.openModal(`
      <div class="modal-head"><h3>Hồ sơ: ${this.esc(u.name)}</h3><button class="modal-close" onclick="App.closeModal()">×</button></div>
      <div class="modal-body">
        <p><strong>Email:</strong> ${this.esc(u.email)}</p>
        <p><strong>Vai trò:</strong> ${u.role}</p>
        <p><strong>Streak:</strong> 🔥 ${p.streak || 1} ngày</p>
      </div>
      <div class="modal-foot"><button class="btn btn-primary" onclick="App.closeModal()">Đóng</button></div>
    `);
  },

  async adminDelUser(email) {
    if (!confirm(`Xóa user ${email}?`)) return;
    try { await UserDB.del('users', email); this.toast('Đã xóa', 'success'); this.render(); } 
    catch { this.toast('Lỗi xóa', 'error'); }
  },

  /* ========== Profile ========== */
  async viewProfile() {
    const u = this.state.user;
    const p = await UserDB.get('progress', u.email) || {};
    const customBg = u.theme || 'linear-gradient(135deg, var(--red), var(--red-dark))';
    
    return `
    <div class="container">
      <div class="glass hero-card" style="display:flex;gap:22px;align-items:center;flex-wrap:wrap;padding-bottom:30px">
        <div class="avatar xl" style="background:${customBg}">${this.initial(u.name)}</div>
        <div style="flex:1;min-width:220px">
          <h1 style="font-size:26px;margin-bottom:4px">${this.esc(u.name)}</h1>
          <p style="color:var(--muted);margin-bottom:8px;font-size:13.5px">${this.esc(u.email)}</p>
          <span class="badge badge-green">🔥 Streak ${p.streak || 1} ngày</span>
          <div style="margin-top:14px">
            <button class="btn btn-glass btn-sm" onclick="App.openEditProfile()">✏️ Chỉnh sửa hồ sơ</button>
          </div>
        </div>
      </div>
    </div>`;
  },

  openEditProfile() {
    const u = this.state.user;
    const themes = [
      'linear-gradient(135deg, #d93828, #b52a1c)',
      'linear-gradient(135deg, #3b82f6, #2563eb)',
      'linear-gradient(135deg, #10b981, #059669)',
      'linear-gradient(135deg, #8b5cf6, #7c3aed)',
      'linear-gradient(135deg, #f59e0b, #d97706)',
    ];
    
    this.openModal(`
      <div class="modal-head"><h3>Chỉnh sửa hồ sơ</h3><button class="modal-close" onclick="App.closeModal()">×</button></div>
      <div class="modal-body">
        <div class="form-group">
          <label>Tên hiển thị</label>
          <input class="input" id="edit-name" value="${this.esc(u.name)}" maxlength="60">
        </div>
        <div class="form-group">
          <label>Màu Avatar</label>
          <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">
            ${themes.map(t => `
              <div onclick="document.getElementById('selected-theme').value='${t}'; this.parentElement.querySelectorAll('.theme-swatch').forEach(el=>el.style.border='3px solid transparent'); this.style.border='3px solid #000';" 
                   class="theme-swatch" 
                   style="width:40px;height:40px;border-radius:50%;background:${t};cursor:pointer;border:${u.theme === t ? '3px solid #000' : '3px solid transparent'}">
              </div>
            `).join('')}
          </div>
          <input type="hidden" id="selected-theme" value="${u.theme || themes[0]}">
        </div>
      </div>
      <div class="modal-foot">
        <button class="btn btn-glass" onclick="App.closeModal()">Hủy</button>
        <button class="btn btn-primary" onclick="App.saveProfile()">Lưu thay đổi</button>
      </div>
    `);
  },

  async saveProfile() {
    const name = Sanitizer.clean(document.getElementById('edit-name').value, 60);
    const theme = document.getElementById('selected-theme').value;
    if (!name) return this.toast('Tên không được để trống', 'error');

    try {
      const u = this.state.user;
      u.name = name;
      u.theme = theme;
      await UserDB.put('users', u);
      this.state.user = u;
      this.closeModal();
      this.toast('Đã lưu hồ sơ!', 'success');
      this.render();
    } catch (err) { this.toast('Lỗi khi lưu', 'error'); }
  }
};

/* ========== Boot ========== */
window.App.init().catch(err => {
  console.error('[DeutschLern] Init error:', err);
  document.getElementById('app').innerHTML = `<div style="padding:40px;text-align:center;color:#d93828"><h1>Lỗi khởi tạo</h1><p>${Sanitizer.esc(err.message || 'Unknown')}</p></div>`;
});
