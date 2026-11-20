 /* =========================================================
   Database Layer — IndexedDB (works on file://)
   2 DB riêng: Users (tài khoản) + Content (nội dung)
   ========================================================= */
(function () {
  'use strict';

  const SALT_ITER = 50;

  class IDB {
    constructor(name, version, stores) {
      this.name = name;
      this.version = version;
      this.stores = stores;
      this.conn = null;
    }
    init() {
      return new Promise((res, rej) => {
        if (!('indexedDB' in window)) return rej(new Error('IndexedDB không được hỗ trợ'));
        const req = indexedDB.open(this.name, this.version);
        req.onupgradeneeded = e => {
          const db = e.target.result;
          for (const [s, opts] of Object.entries(this.stores)) {
            if (!db.objectStoreNames.contains(s)) db.createObjectStore(s, opts);
          }
        };
        req.onsuccess = e => { this.conn = e.target.result; res(); };
        req.onerror = () => rej(req.error || new Error('DB error'));
        req.onblocked = () => rej(new Error('Đóng các tab khác đang dùng app'));
      });
    }
    get(store, key) {
      return new Promise((res, rej) => {
        const r = this.conn.transaction(store, 'readonly').objectStore(store).get(key);
        r.onsuccess = () => res(r.result);
        r.onerror = () => rej(r.error);
      });
    }
    put(store, v) {
      return new Promise((res, rej) => {
        const r = this.conn.transaction(store, 'readwrite').objectStore(store).put(v);
        r.onsuccess = () => res(r.result);
        r.onerror = () => rej(r.error);
      });
    }
    del(store, key) {
      return new Promise((res, rej) => {
        const r = this.conn.transaction(store, 'readwrite').objectStore(store).delete(key);
        r.onsuccess = () => res();
        r.onerror = () => rej(r.error);
      });
    }
    getAll(store) {
      return new Promise((res, rej) => {
        const r = this.conn.transaction(store, 'readonly').objectStore(store).getAll();
        r.onsuccess = () => res(r.result || []);
        r.onerror = () => rej(r.error);
      });
    }
    clear(store) {
      return new Promise((res, rej) => {
        const r = this.conn.transaction(store, 'readwrite').objectStore(store).clear();
        r.onsuccess = () => res();
        r.onerror = () => rej(r.error);
      });
    }
  }

  /* DB #1 — Tài khoản (KHÔNG bị ảnh hưởng khi reset content) */
  window.UserDB = new IDB('DeutschLern_Users', 1, {
    users:       { keyPath: 'email' },
    progress:    { keyPath: 'email' },
    examResults: { keyPath: 'id', autoIncrement: true }
  });

  /* DB #2 — Nội dung (announcements) */
  window.ContentDB = new IDB('DeutschLern_Content', 1, {
    announcements: { keyPath: 'id', autoIncrement: true },
    settings:      { keyPath: 'key' }
  });

  /* ========== Helpers ========== */
  function genSalt() {
    if (window.crypto && crypto.getRandomValues) {
      const arr = new Uint8Array(16);
      crypto.getRandomValues(arr);
      return Array.from(arr).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    let s = '';
    for (let i = 0; i < 32; i++) s += Math.floor(Math.random() * 16).toString(16);
    return s;
  }

  function hashPassword(pw, salt) {
    let h = sha256(salt + ':' + pw + ':DL2024v1');
    for (let i = 0; i < SALT_ITER; i++) h = sha256(h + salt);
    return 'v1$' + salt + '$' + h;
  }

  function verifyPassword(pw, stored) {
    if (!stored || typeof stored !== 'string' || !stored.startsWith('v1$')) return false;
    const parts = stored.split('$');
    if (parts.length !== 3) return false;
    const salt = parts[1];
    return hashPassword(pw, salt) === stored;
  }

  /* ========== DBHelper ========== */
  window.DBHelper = {
    async init() {
      await UserDB.init();
      await ContentDB.init();
      await this.ensureAdmin();
    },

    hash: hashPassword,
    verify: verifyPassword,
    genSalt,

    async ensureAdmin() {
      /* === Thông tin admin (cấu hình tại đây) === */
      const ADMIN_ID = 'vanbacazerst.vn2908';
      const ADMIN_PW = 'aBc@2908vanbac0809';
      const ADMIN_NAME = 'Quản trị viên';

      const existing = await UserDB.get('users', ADMIN_ID);

      /* Nếu chưa có → tạo mới */
      if (!existing) {
        const salt = genSalt();
        await UserDB.put('users', {
          email: ADMIN_ID,
          name: ADMIN_NAME,
          role: 'admin',
          password: hashPassword(ADMIN_PW, salt),
          createdAt: Date.now()
        });
        await UserDB.put('progress', {
          email: ADMIN_ID,
          completed: 0,
          streak: 1,
          lastVisit: Date.now()
        });
        return;
      }

      /* Nếu đã có nhưng password không verify (do cập nhật credentials) → reset */
      if (!verifyPassword(ADMIN_PW, existing.password)) {
        const salt = genSalt();
        existing.password = hashPassword(ADMIN_PW, salt);
        existing.role = 'admin';
        existing.name = ADMIN_NAME;
        await UserDB.put('users', existing);
      }
    }
  };
})();
