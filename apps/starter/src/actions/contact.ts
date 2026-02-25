import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

export const submitContactForm = defineAction({
  accept: 'form',
  input: z.object({
    name: z.string().min(1, { error: 'Name is required' }).max(100),
    email: z.email('Invalid email format'),
    subject: z.string().min(1, { error: 'Subject is required' }).max(200),
    message: z.string().min(1, { error: 'Message is required' }).max(5000),
  }),
  handler: async (input) => {
    // Production: send via Resend, Postmark, SES, or save to D1/KV
    console.log('[contact]', input.email, input.subject);
    return { message: 'Message sent successfully.' };
  },
});
