export default async (request, context) => {
  const response = await context.next();
  
  response.headers.set('X-Cosmic-Power', 'Quantum-Enabled');
  response.headers.set('X-Astrotrias', 'Archon-Active');
  
  return response;
};
