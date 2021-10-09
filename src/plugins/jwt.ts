const fp = require('fastify-plugin');
const jwt = require('fastify-jwt');

module.exports = fp(async function (fastify: any) {
  fastify.register(jwt, {
    secret: 'Supersecret!@#',
  });

  fastify.decorate('authenticate', async function (request: any, reply: any) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
