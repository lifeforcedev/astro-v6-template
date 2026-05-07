import { createEnvSchema, validateEnv } from '@astro-v6/shared/utils/env';

const envSchema = createEnvSchema({
  PUBLIC_SITE_URL: 'https://astrov6blog.casoon.dev',
  PUBLIC_SITE_NAME: 'Astro v6 Blog',
  PUBLIC_AUTHOR: 'Your Name',
  PUBLIC_LOCALE: 'en',
});

export const env = validateEnv(envSchema, import.meta.env ?? {});
