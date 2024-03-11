/** Simple Client-Side Router */
class Router {
    constructor() {
        this.routes = [];
        window.addEventListener('popstate', () => this.resolve());
    }
    add(path, handler) {
        const params = [];
        const regex = path.replace(/:([^/]+)/g, (_, key) => { params.push(key); return '([^/]+)'; });
        this.routes.push({ regex: new RegExp('^' + regex + '$'), handler, params });
        return this;
    }
    navigate(path) {
        history.pushState(null, '', path);
        this.resolve();
    }
    resolve() {
        const path = window.location.pathname;
        for (const route of this.routes) {
            const match = path.match(route.regex);
            if (match) {
                const params = {};
                route.params.forEach((key, i) => { params[key] = match[i + 1]; });
                route.handler(params);
                return;
            }
        }
        this.routes[0]?.handler({});
    }
    start() { this.resolve(); }
}
