import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

export const subscribeNewsletter = defineAction({
  accept: 'form',
  input: z.object({
    email: z.email('Please enter a valid email address'),
  }),
  handler: async (input) => {
    // Production: POST to Mailchimp, Buttondown, ConvertKit, etc.
    console.log('[newsletter]', input.email);
    return { message: 'Thanks for subscribing!' };
  },
});
