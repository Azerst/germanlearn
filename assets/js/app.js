/* =========================================================
   App Controller - Giao diện & Logic
   ========================================================= */
window.App = {
  state: {
    user: null,
    view: 'home',
    adminTab: 'users',
    // Các state khác...
  },

  async init() {
    try {
      await DBHelper.init();
      const sess = localStorage.getItem('azerst_session');
      if (sess) {
        const user = await DBHelper.get('users', sess);
        if (user) this.state.user = user;
      }
      this.render();
    } catch (err) {
      document.body.innerHTML = `<h1 style="text-align:center;margin-top:50px;color:red">Lỗi khởi tạo Database: ${err.message}</h1>`;
    }
  },

  go(view) {
    if (['vocabulary', 'flashcards', 'grammar', 'exam', 'profile', 'admin'].includes(view) && !this.state.user) {
      this.state.view = 'login';
      this.render();
      return;
    }
    this.state.view = view;
    this.render();
    window.scrollTo(0, 0);
  },

  async login() {
    const email = document.getElementById('login-email').value.trim().toLowerCase();
    const pw = document.getElementById('login-pw').value;
    if (!email || !pw) return alert('Nhập đầy đủ thông tin');

    const user = await DBHelper.get('users', email);
    if (!user) return alert('Tài khoản không tồn tại');

    const hashedPw = await DBHelper.hashPassword(pw);
    if (user.password !== hashedPw) return alert('Sai mật khẩu');

    localStorage.setItem('azerst_session', user.email);
    this.state.user = user;
    this.state.view = (user.role === 'admin' || user.role === 'manager') ? 'admin' : 'profile';
    this.render();
  },

  async register() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim().toLowerCase();
    const pw = document.getElementById('reg-pw').value;
    if (!name || !email || !pw) return alert('Nhập đầy đủ thông tin');

    if (await DBHelper.get('users', email)) return alert('Email đã tồn tại');

    const newUser = {
      email, name, role: 'user',
      password: await DBHelper.hashPassword(pw),
      createdAt: Date.now(),
      bio: 'Thành viên mới của AZERST',
      avatarEmoji: '👤'
    };
    await DBHelper.put('users', newUser);
    localStorage.setItem('azerst_session', email);
    this.state.user = newUser;
    this.state.view = 'profile';
    this.render();
  },

  logout() {
    localStorage.removeItem('azerst_session');
    this.state.user = null;
    this.state.view = 'home';
    this.render();
  },

  /* ========== NAVBAR ========== */
  nav() {
    const u = this.state.user;
    const isAuthView = ['login', 'register'].includes(this.state.view);

    return `
    <nav class="nav">
      <div class="nav-inner">
        <div class="logo-wrap" onclick="App.go('home')">
          <img src="https://azerst-image-vn.vercel.app/images/3CORZB1YF.png" alt="Logo" class="logo-img">
          <span class="logo-text">AZERST</span>
        </div>
        
        <div class="nav-links">
          <button class="btn btn-glass btn-sm" onclick="App.go('vocabulary')">Từ vựng</button>
          <button class="btn btn-glass btn-sm" onclick="App.go('grammar')">Ngữ pháp</button>
          <button class="btn btn-glass btn-sm" onclick="App.go('exam')">Thi thử</button>
          ${u && (u.role === 'admin' || u.role === 'manager') ? `<button class="btn btn-primary btn-sm" onclick="App.go('admin')">Quản trị</button>` : ''}
        </div>

        <div class="nav-actions">
          ${u ? `
            <div class="user-chip" onclick="App.go('profile')">
              <div class="avatar" style="width:32px;height:32px;font-size:16px;">${u.avatarEmoji}</div>
              <span class="user-name">${u.name}</span>
            </div>
            <button class="btn btn-glass btn-sm" onclick="App.logout()">Thoát</button>
          ` : `
            <button class="btn btn-glass btn-sm" onclick="App.go('login')">Đăng nhập</button>
            <button class="btn btn-primary btn-sm" onclick="App.go('register')">Đăng ký</button>
          `}
        </div>
      </div>
    </nav>`;
  },

  /* ========== FOOTER ========== */
  footer() {
    return `
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-col">
          <h4>Học tập</h4>
          <a onclick="App.go('vocabulary')">Từ vựng</a>
          <a onclick="App.go('grammar')">Ngữ pháp</a>
          <a onclick="App.go('exam')">Thi thử</a>
        </div>
        <div class="footer-col">
          <h4>Tài khoản</h4>
          <a onclick="App.go('login')">Đăng nhập</a>
          <a onclick="App.go('register')">Đăng ký</a>
          <a onclick="App.go('profile')">Hồ sơ cá nhân</a>
        </div>
      </div>
      <div class="footer-bottom">© ${new Date().getFullYear()} AZERST. All rights reserved.</div>
    </footer>`;
  },

  /* ========== RENDER ROUTER ========== */
  async render() {
    const app = document.getElementById('app');
    let html = this.nav();

    switch (this.state.view) {
      case 'home': html += this.viewHome(); break;
      case 'login': html += this.viewLogin(); break;
      case 'register': html += this.viewRegister(); break;
      case 'profile': html += await this.viewProfile(); break;
      case 'admin': html += await this.viewAdmin(); break;
      case 'vocabulary': html += this.viewVocabulary(); break;
      case 'grammar': html += this.viewGrammar(); break;
      case 'exam': html += this.viewExam(); break;
      default: html += this.viewHome();
    }

    html += this.footer();
    app.innerHTML = html;
  },

  /* ========== TRANG CHỦ (Đã xóa text thừa) ========== */
  viewHome() {
    return `
    <main>
      <section class="hero-clean">
        <h1>Tự tin chinh phục<br><span class="accent">Tiếng Đức</span> cùng AZERST</h1>
        <div class="hero-cta">
          <button class="btn btn-primary btn-lg" onclick="App.go(${this.state.user ? "'profile'" : "'register'"})">
            ${this.state.user ? 'Vào Hồ sơ' : 'Bắt đầu ngay'}
          </button>
          <button class="btn btn-glass btn-lg" onclick="document.getElementById('features').scrollIntoView({behavior:'smooth'})">Tìm hiểu thêm</button>
        </div>
      </section>

      <section class="section" id="features">
        <div class="section-head">
          <h2>Công cụ học tập</h2>
        </div>
        <div class="feature-grid">
          <div class="glass feature-card" onclick="App.go('vocabulary')">
            <h3>Từ vựng</h3>
            <p>Học từ vựng phân loại theo chủ đề thực tế: gia đình, công việc, du lịch...</p>
          </div>
          <div class="glass feature-card" onclick="App.go('grammar')">
            <h3>Ngữ pháp</h3>
            <p>Các quy tắc ngữ pháp cơ bản với ví dụ cụ thể, dễ hiểu.</p>
          </div>
          <div class="glass feature-card" onclick="App.go('exam')">
            <h3>Thi thử</h3>
            <p>Mô phỏng đề thi với đồng hồ đếm ngược và lưu kết quả.</p>
          </div>
        </div>
      </section>
    </main>`;
  },

  /* ========== PROFILE (Giao diện đẹp, tách biệt) ========== */
  async viewProfile() {
    const u = this.state.user;
    return `
    <div class="container">
      <div class="glass profile-card">
        <div class="profile-avatar-wrap">
          <div class="profile-avatar ${u.role === 'admin' ? 'admin-avatar' : ''}">${u.avatarEmoji}</div>
        </div>
        <div class="profile-info">
          <div class="profile-name">${u.name}</div>
          <div class="profile-email">${u.email}</div>
          <div style="margin-bottom:12px;">
            <span class="badge ${u.role === 'admin' ? 'badge-red' : u.role === 'manager' ? 'badge-amber' : 'badge-blue'}">
              ${u.role === 'admin' ? 'Quản trị viên tối cao' : u.role === 'manager' ? 'Quản lý' : 'Học viên'}
            </span>
          </div>
          <div class="profile-bio">"${u.bio || 'Chưa cập nhật tiểu sử'}"</div>
        </div>
        <button class="btn btn-glass btn-sm btn-edit" onclick="App.editProfile()">Chỉnh sửa hồ sơ</button>
      </div>
    </div>`;
  },

  editProfile() {
    const u = this.state.user;
    document.getElementById('modalRoot').innerHTML = `
      <div class="modal-backdrop show" onclick="if(event.target===this)App.closeModal()">
        <div class="modal" style="padding:24px; width:90%; max-width:400px;">
          <h3 style="margin-bottom:16px;">Chỉnh sửa Hồ sơ</h3>
          <div class="form-group"><label>Tiểu sử</label><textarea class="input" id="edit-bio" maxlength="150">${u.bio || ''}</textarea></div>
          <div class="form-group"><label>Avatar (Emoji)</label><input class="input" id="edit-emoji" value="${u.avatarEmoji}" maxlength="5"></div>
          <div style="display:flex;gap:10px;margin-top:20px;">
            <button class="btn btn-glass btn-block" onclick="App.closeModal()">Hủy</button>
            <button class="btn btn-primary btn-block" onclick="App.saveProfile()">Lưu</button>
          </div>
        </div>
      </div>`;
  },

  async saveProfile() {
    const u = this.state.user;
    u.bio = document.getElementById('edit-bio').value;
    u.avatarEmoji = document.getElementById('edit-emoji').value || '👤';
    await DBHelper.put('users', u);
    this.closeModal();
    this.render();
  },

  closeModal() { document.getElementById('modalRoot').innerHTML = ''; },

  /* ========== ADMIN PANEL (Phân quyền Admin & Manager) ========== */
  async viewAdmin() {
    const u = this.state.user;
    if (u.role !== 'admin' && u.role !== 'manager') return this.viewProfile();
    
    const users = await DBHelper.getAll('users');
    const isAdmin = u.role === 'admin';

    return `
    <div class="container">
      <div class="glass" style="padding:30px; margin-bottom:20px;">
        <h2>Hệ thống Quản trị</h2>
        <p style="color:var(--muted); margin-top:5px;">Vai trò của bạn: <b>${isAdmin ? 'Quản trị viên' : 'Quản lý'}</b></p>
      </div>

      <div class="table-wrap">
        <table class="table">
          <thead>
            <tr>
              <th>Họ tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              ${isAdmin ? '<th>Hành động (Admin)</th>' : ''}
            </tr>
          </thead>
          <tbody>
            ${users.map(user => `
              <tr>
                <td><strong>${user.name}</strong></td>
                <td>${user.email}</td>
                <td>
                  <span class="badge ${user.role === 'admin' ? 'badge-red' : user.role === 'manager' ? 'badge-amber' : 'badge-blue'}">
                    ${user.role.toUpperCase()}
                  </span>
                </td>
                ${isAdmin ? `
                <td>
                  ${user.role !== 'admin' ? `<button class="btn btn-glass btn-sm" onclick="App.changeRole('${user.email}', 'admin')">Thăng Admin</button>` : ''}
                  ${user.role !== 'manager' ? `<button class="btn btn-glass btn-sm" onclick="App.changeRole('${user.email}', 'manager')">Làm Quản lý</button>` : ''}
                  ${user.role !== 'user' ? `<button class="btn btn-glass btn-sm" onclick="App.changeRole('${user.email}', 'user')">Hạ User</button>` : ''}
                </td>` : ''}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      ${isAdmin ? `
      <div class="glass" style="padding:24px; margin-top:24px;">
        <h3>Xuất / Nhập Dữ liệu (Backup)</h3>
        <p style="font-size:13px; color:var(--muted); margin-bottom:12px;">Dùng tính năng này để lưu trữ tài khoản phòng trường hợp đổi thiết bị hoặc xóa cache trình duyệt.</p>
        <div style="display:flex; gap:10px;">
          <button class="btn btn-primary" onclick="App.exportData()">Tải xuống Data (JSON)</button>
          <input type="file" id="import-file" style="display:none;" accept=".json" onchange="App.importData(event)">
          <button class="btn btn-glass" onclick="document.getElementById('import-file').click()">Khôi phục từ File</button>
        </div>
      </div>` : ''}
    </div>`;
  },

  async changeRole(email, newRole) {
    if (this.state.user.role !== 'admin') return alert('Bạn không có quyền!');
    if (email === this.state.user.email) return alert('Không thể tự đổi quyền của chính mình!');
    const targetUser = await DBHelper.get('users', email);
    if (targetUser) {
      targetUser.role = newRole;
      await DBHelper.put('users', targetUser);
      this.render();
    }
  },

  async exportData() {
    const users = await DBHelper.getAll('users');
    const blob = new Blob([JSON.stringify(users, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `AZERST_Backup_${Date.now()}.json`;
    a.click();
  },

  async importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (Array.isArray(data)) {
          for (const u of data) await DBHelper.put('users', u);
          alert('Khôi phục dữ liệu thành công!');
          this.render();
        }
      } catch (err) { alert('File không hợp lệ'); }
    };
    reader.readAsText(file);
  },

  /* ========== CÁC VIEW KHÁC (Từ vựng, Ngữ pháp, Thi thử) ========== */
  viewVocabulary() { return `<div class="container"><h2>Từ vựng</h2><p>Đang cập nhật...</p></div>`; },
  viewGrammar() { return `<div class="container"><h2>Ngữ pháp</h2><p>Đang cập nhật...</p></div>`; },
  viewExam() { return `<div class="container"><h2>Thi thử</h2><p>Đang cập nhật...</p></div>`; },
};

// Khởi chạy
window.onload = () => window.App.init();
