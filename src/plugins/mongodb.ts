import fp from 'fastify-plugin';
import mongodb from 'fastify-mongodb';

export default fp(async (fastify) => {
  fastify.register(mongodb, {
    forceClose: true,
    url: process.env.MONGO_URL,
  });
});
