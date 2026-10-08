/**
 * All backend API endpoints.
 *
 * Never hardcode endpoint strings inside services.
 */

export const API = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/me",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    changePassword: "/auth/change-password",
  },

  users: {
    list: "/users",
    create: "/users",

    byId: (id: string) => `/users/${id}`,

    update: (id: string) => `/users/${id}`,

    delete: (id: string) => `/users/${id}`,
  },

  profiles: {
    me: "/profiles/me",

    updateMe: "/profiles/me",

    byUser: (userId: string) => `/profiles/user/${userId}`,
  },

  roles: {
    list: "/roles",

    create: "/roles",

    byId: (id: string) => `/roles/${id}`,

    update: (id: string) => `/roles/${id}`,

    delete: (id: string) => `/roles/${id}`,
  },

  permissions: {
    list: "/permissions",

    create: "/permissions",

    byId: (id: string) => `/permissions/${id}`,

    update: (id: string) => `/permissions/${id}`,

    delete: (id: string) => `/permissions/${id}`,
  },

  teams: {
    list: "/teams",

    create: "/teams",

    byId: (id: string) => `/teams/${id}`,

    update: (id: string) => `/teams/${id}`,

    delete: (id: string) => `/teams/${id}`,
  },

  posts: {
    list: "/posts",

    create: "/posts",

    byId: (id: string) => `/posts/${id}`,

    update: (id: string) => `/posts/${id}`,

    delete: (id: string) => `/posts/${id}`,
  },

  comments: {
    list: "/comments",

    create: "/comments",

    byId: (id: string) => `/comments/${id}`,

    update: (id: string) => `/comments/${id}`,

    delete: (id: string) => `/comments/${id}`,
  },

  reactions: {
    list: "/reactions",

    create: "/reactions",

    delete: (id: string) => `/reactions/${id}`,
  },

  uploads: {
    single: "/uploads",

    multiple: "/uploads/multiple",
  },
  ai: {
    upload: "/documents/upload",
    list: "/documents",
    byId: (id: string) => `/documents/${id}`,
    delete: (id: string) => `/documents/${id}`,
    chat: "/ai/chat",
    conversations: "/conversation",
    messages: (id: string) => `/conversation/${id}/messages`,
  },
  phoneNumbers: {
    list: "/phone-numbers",
  },
} as const;
