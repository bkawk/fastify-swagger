import fp from 'fastify-plugin';

export default fp(async (fastify) => {
  fastify.register(require('fastify-cookie'), {
    secret: 'Supersecret!@#',
    parseOptions: {},
  });
});
