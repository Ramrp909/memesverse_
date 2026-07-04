import { env } from "./env";

export const AppConfig = {
  app: {
    name: env.APP_NAME,
    version: env.APP_VERSION,
  },

  api: {
    baseURL: env.API_BASE_URL,
    timeout: 15000,
  },

  pagination: {
    defaultLimit: 20,
  },
} as const;