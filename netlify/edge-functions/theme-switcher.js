// netlify/edge-functions/theme-switcher.js
export default async (request, context) => {
  const prefersDark = request.headers.get("sec-ch-prefers-color-scheme") === "dark";
  const theme = prefersDark ? "cosmic-dark" : "cosmic-light";
  return new Response(JSON.stringify({ theme }), {
    headers: { "Content-Type": "application/json" },
  });
};
