import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ session }) => {
  const visits = ((await session?.get('visits')) ?? 0) + 1;
  const lastVisit = new Date().toISOString();

  session?.set('visits', visits);
  session?.set('lastVisit', lastVisit);

  return new Response(JSON.stringify({ visits, lastVisit }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const DELETE: APIRoute = async ({ session }) => {
  session?.destroy();

  return new Response(JSON.stringify({ message: 'Session destroyed' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
