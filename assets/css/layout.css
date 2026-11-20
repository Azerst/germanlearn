/* =========================================================
   Database Helper - Bảo toàn dữ liệu
   ========================================================= */
const DB_NAME = 'AZERST_Learning_DB'; // KHÔNG ĐỔI TÊN NÀY ĐỂ KHÔNG MẤT DATA
const DB_VERSION = 1;

window.DBHelper = {
  db: null,
  async init() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onerror = () => reject(req.error);
      req.onsuccess = () => { this.db = req.result; resolve(); };
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('users')) db.createObjectStore('users', { keyPath: 'email' });
        if (!db.objectStoreNames.contains('progress')) db.createObjectStore('progress', { keyPath: 'email' });
        if (!db.objectStoreNames.contains('examResults')) db.createObjectStore('examResults', { keyPath: 'id', autoIncrement: true });
      };
    });
  },
  async get(store, key) {
    return new Promise((res, rej) => {
      const tx = this.db.transaction(store, 'readonly');
      const req = tx.objectStore(store).get(key);
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  },
  async put(store, data) {
    return new Promise((res, rej) => {
      const tx = this.db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).put(data);
      req.onsuccess = () => res();
      req.onerror = () => rej(req.error);
    });
  },
  async getAll(store) {
    return new Promise((res, rej) => {
      const tx = this.db.transaction(store, 'readonly');
      const req = tx.objectStore(store).getAll();
      req.onsuccess = () => res(req.result);
      req.onerror = () => rej(req.error);
    });
  },
  // Hàm Hash mật khẩu cơ bản (Dùng SHA-256 ở client)
  async hashPassword(password) {
    const msgBuffer = new TextEncoder().encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
};
