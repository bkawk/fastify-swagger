import fp from 'fastify-plugin';
import cors from 'fastify-cors';

export default fp(async (fastify) => {
  fastify.register(cors, () => (callback: any): void => {
    let corsOptions;
    if (/localhost/.test(origin)) {
      corsOptions = { origin: false };
    } else {
      corsOptions = { origin: 'www.mywebsite.com' };
    }
    callback(null, corsOptions);
  });
});
