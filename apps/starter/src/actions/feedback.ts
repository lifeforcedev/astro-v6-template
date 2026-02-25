import { defineAction } from 'astro:actions';
import { z } from 'astro/zod';

export const submitFeedback = defineAction({
  accept: 'form',
  input: z.object({
    page: z.string().min(1),
    rating: z.coerce.number().int().min(1).max(5),
    comment: z.string().max(1000).optional(),
  }),
  handler: async (input) => {
    // Production: save to D1, analytics, or KV
    console.log('[feedback]', input.page, `${input.rating}/5`, input.comment ?? '');
    return { message: 'Feedback received.' };
  },
});
