export const endpoints = {
    SERVER_ORIGIN_URI: "http://localhost:5000",
    ADMINS: {
        ROUTE: "/api/admins",
        LOGIN: "/login",
        CREATE: "/create",
        REMOVE: "/remove",
        GET_ALL: "/",
        ACTIONS: "/actions",
        CHANGE: "/change"
    },
    FLIGHTS: {
        ROUTE: "/api/flights",
        CREATE: "/create",
        REMOVE: "/remove",
        CHANGE: "/change",
        GET_ALL: "/"
    },
    PLANES: {
        ROUTE: "/api/planes",
        CREATE: "/create",
        REMOVE: "/remove",
        CHANGE: "/change",
        GET_ALL: "/",
        GET_FREE: '/free',
        GET_BUSY: '/busy',
        PLANE: '/plane'
    },
    AIRPORTS: {
        ROUTE: "/api/airports",
        CREATE: "/create",
        REMOVE: "/remove",
        CHANGE: "/change",
        GET_ALL: "/"
    },
    BILETS: {
        ROUTE: "/api/bilets",
        CREATE: "/create",
        REMOVE: "/remove",
        CHANGE: "/change",
        GET_ALL: "/"
    },
    PASSENGERS: {
        ROUTE: "/api/passengers",
        CREATE: '/create',
        REMOVE: '/remove',
        CHANGE: '/change',
        GET_ALL: "/"
    }
}

window.endpoints = endpoints;
