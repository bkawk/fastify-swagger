import fp from 'fastify-plugin';
import mongodb from 'fastify-mongodb';

export default fp(async (fastify) => {
  fastify.register(mongodb, {
    forceClose: true,
    url: 'mongodb+srv://dbuser:vpg9LO7r64WVW46M@cluster0.otigz.mongodb.net/myapp?retryWrites=true&w=majority',
  });
});
