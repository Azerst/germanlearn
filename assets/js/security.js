 /* =========================================================
   Security Layer — Sanitizer, RateLimiter, SessionManager
   ========================================================= */
(function () {
  'use strict';

  /* ========== Sanitizer (chống XSS) ========== */
  window.Sanitizer = {
    esc(s) {
      return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    },
    /* Loại bỏ control chars, giới hạn độ dài */
    clean(s, maxLen = 500) {
      return String(s || '').replace(/[\x00-\x1F\x7F]/g, '').slice(0, maxLen).trim();
    },
    /* Kiểm tra email hợp lệ */
    isEmail(s) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
    },
    /* Kiểm tra độ mạnh mật khẩu */
    isStrongPassword(pw) {
      return pw.length >= 8
        && /[a-z]/.test(pw)
        && /[A-Z]/.test(pw)
        && /[0-9]/.test(pw);
    }
  };

  /* ========== RateLimiter (chống brute force) ========== */
  window.RateLimiter = {
    MAX_ATTEMPTS: 5,
    LOCK_MINUTES: 5,

    _key(id) {
      return 'dl_rl_' + btoa(encodeURIComponent(id)).replace(/=/g, '');
    },
    _get(id) {
      try { return JSON.parse(localStorage.getItem(this._key(id)) || '{}'); }
      catch { return {}; }
    },
    _set(id, data) {
      try { localStorage.setItem(this._key(id), JSON.stringify(data)); } catch {}
    },

    check(id) {
      const d = this._get(id);
      if (d.lockUntil && Date.now() < d.lockUntil) {
        return {
          locked: true,
          remaining: Math.ceil((d.lockUntil - Date.now()) / 60000)
        };
      }
      if (d.lockUntil && Date.now() >= d.lockUntil) this._set(id, {});
      return { locked: false, attempts: d.attempts || 0 };
    },

    fail(id) {
      const d = this._get(id);
      d.attempts = (d.attempts || 0) + 1;
      if (d.attempts >= this.MAX_ATTEMPTS) {
        d.lockUntil = Date.now() + this.LOCK_MINUTES * 60 * 1000;
      }
      this._set(id, d);
      return d;
    },

    success(id) { this._set(id, {}); }
  };

  /* ========== SessionManager (7 ngày sliding) ========== */
  window.SessionManager = {
    TTL_MS: 7 * 24 * 60 * 60 * 1000,

    set(email) {
      try {
        localStorage.setItem('dl_session', JSON.stringify({
          email,
          ts: Date.now(),
          exp: Date.now() + this.TTL_MS
        }));
      } catch {}
    },

    get() {
      try {
        const raw = localStorage.getItem('dl_session');
        if (!raw) return null;
        const s = JSON.parse(raw);
        if (!s.exp || Date.now() > s.exp) {
          localStorage.removeItem('dl_session');
          return null;
        }
        return s;
      } catch { return null; }
    },

    refresh() {
      const s = this.get();
      if (s) this.set(s.email);
    },

    clear() { localStorage.removeItem('dl_session'); }
  };

  /* ========== Integrity Check ========== */
  window.IntegrityCheck = {
    run() {
      const required = ['sha256', 'UserDB', 'ContentDB', 'DBHelper', 'VOCAB', 'GRAMMAR', 'App'];
      const missing = required.filter(x => typeof window[x] === 'undefined');
      return { ok: missing.length === 0, missing };
    }
  };

  /* ========== Frame busting ========== */
  try {
    if (window.top !== window.self) window.top.location = window.self.location;
  } catch (e) { /* cross-origin iframe block */ }
})();
