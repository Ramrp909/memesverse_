const requiredEnv = (value: string | undefined, key: string): string => {
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env = {
  API_BASE_URL: requiredEnv(
    process.env.NEXT_PUBLIC_API_BASE_URL,
    "NEXT_PUBLIC_API_BASE_URL"
  ),

  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME ?? "MemeVerse",

  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION ?? "1.0.0",

  NODE_ENV: process.env.NODE_ENV,
} as const;