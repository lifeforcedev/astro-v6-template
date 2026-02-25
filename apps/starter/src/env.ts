import { createEnvSchema, validateEnv } from '@astro-v6/shared/utils/env';

const envSchema = createEnvSchema({
  PUBLIC_SITE_URL: 'http://localhost:4321',
  PUBLIC_SITE_NAME: 'Astro v6 Starter',
  PUBLIC_AUTHOR: 'Your Name',
  PUBLIC_LOCALE: 'en',
});

export const env = validateEnv(envSchema, import.meta.env);
