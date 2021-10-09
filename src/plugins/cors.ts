import fp from 'fastify-plugin';
import cors from 'fastify-cors';

export default fp(async (fastify) => {
  fastify.register(cors, (): any => {
    return (req: any, callback: any): any => {
      let corsOptions;
      const origin = req.headers.origin;
      if (/localhost/.test(origin)) {
        corsOptions = { origin: false };
      } else {
        corsOptions = {
          origin: '/example.com$/',
          methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        };
      }
      callback(null, corsOptions);
    };
  });
});
