/**
 * MAD101 STUDIO — HASH ROUTER
 * js/router.js
 * 
 * Supports offline hash navigation with state preservation and browser Back button.
 */

class HashRouter {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.currentCleanup = null;
    this.container = null;

    window.addEventListener('hashchange', () => this.handleRouting());
  }

  init(containerElement) {
    this.container = containerElement;
    if (!window.location.hash) {
      window.location.hash = '#/home';
    } else {
      this.handleRouting();
    }
  }

  register(routePath, handler, cleanupFn = null) {
    this.routes[routePath] = { handler, cleanup: cleanupFn };
  }

  navigate(path, params = {}) {
    let hash = '#/' + path.replace(/^#?\/?/, '');
    const query = new URLSearchParams(params).toString();
    if (query) {
      hash += '?' + query;
    }
    window.location.hash = hash;
  }

  parseHash() {
    const raw = window.location.hash.slice(1) || '/home';
    const [pathPart, queryPart] = raw.split('?');
    const path = pathPart.replace(/^\/?/, '').toLowerCase() || 'home';
    const params = {};
    if (queryPart) {
      const sp = new URLSearchParams(queryPart);
      for (const [k, v] of sp.entries()) {
        params[k] = v;
      }
    }
    return { path, params };
  }

  async handleRouting() {
    const { path, params } = this.parseHash();

    // Call cleanup of previous route if registered
    if (this.currentCleanup && typeof this.currentCleanup === 'function') {
      try {
        this.currentCleanup();
      } catch (e) {
        console.warn('[Router] Cleanup error:', e);
      }
      this.currentCleanup = null;
    }

    const routeKey = path.split('/')[0];
    const matched = this.routes[routeKey] || this.routes['home'];

    if (matched && this.container) {
      this.currentRoute = routeKey;
      try {
        this.currentCleanup = matched.cleanup;
        await matched.handler(this.container, params);
      } catch (err) {
        console.error(`[Router] Error rendering route ${routeKey}:`, err);
        this.container.innerHTML = `
          <div class="ui-error-state">
            <div class="ui-error-icon">⚠️</div>
            <h2>Đã xảy ra lỗi khi tải màn hình</h2>
            <p>${err.message}</p>
            <div style="margin-top:20px;">
              <a href="#/home" class="ui-btn ui-btn-primary">Về trang chủ</a>
            </div>
          </div>
        `;
      }
    }
  }
}

export const router = new HashRouter();
