import {
  contactFormSchema,
  errorResponse,
  successResponse,
  validateRequest,
} from '@astro-v6/shared';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const result = await validateRequest(contactFormSchema, data);

    if (!result.success) {
      return errorResponse(result.error);
    }

    // TODO: Send email, save to DB, etc.
    return successResponse(result.data, 'Message sent successfully.');
  } catch {
    return errorResponse('Invalid request.', 400);
  }
};
