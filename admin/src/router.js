class Router {
    constructor() {
        this.routes = {};

        this.route = function (path, callback) {
            this.routes[path] = callback;
        };

        this.navigate = function (path) {
            if (this.routes[path]) {
                this.routes[path]();
                window.history.pushState({}, path, window.location.origin + path);
            } else {
                console.error(`No route found for path: ${path}`);
            }
        };

        this.init = function () {
            window.addEventListener('load', this.routeHandler.bind(this));
            window.addEventListener('popstate', this.routeHandler.bind(this));
        };

        this.routeHandler = function () {
            const path = window.location.pathname || '/';
            this.navigate(path);
        };
    }
}

const router = new Router();
