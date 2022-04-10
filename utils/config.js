module.exports = {
  SCHEMAS: {
    USERS: "users",
  },
  STATUS_CODES: {
    NOT_FOUND: 404,
    SUCCESS: 200,
    SERVER_ERROR: 500,
    FILE_NOT_FOUND: 404,
  },
  ROUTES: {
    ROOT: "/",
    USER: {
      LOGIN: "/login",
      REGISTER: "/register",
      PROFILE: "/show",
    },
    ORDER: {
      DETAILS: "/orders",
      HISTORY: "/history",
    },
  },
};
