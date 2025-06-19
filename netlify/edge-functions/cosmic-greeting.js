// netlify/edge-functions/cosmic-greeting.js
export default async (request, context) => {
  const country = context.geo?.country?.name || "unknown dimension";
  return new Response(`Welcome, traveler from ${country}!`, {
    headers: { "Content-Type": "text/html" },
  });
};
