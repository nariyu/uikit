export const Config = {
  VERSION: process.env.VERSION,

  NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
  ENV: process.env.ENV as 'local' | 'develop' | 'staging' | 'production',
  VERCEL_URL: process.env.VERCEL_URL as string,
};
