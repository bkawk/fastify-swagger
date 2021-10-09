import fp from 'fastify-plugin';
import swagger, { SwaggerOptions } from 'fastify-swagger';

export default fp<SwaggerOptions>(async (fastify) => {
  fastify.register(swagger, {
    routePrefix: '/docs',
    swagger: {
      info: {
        title: 'My App',
        description: 'My App API',
        version: '0.1.0',
      },
      externalDocs: {
        url: `https://${process.env.DOMAIN}/docs`,
        description: 'Find more info here',
      },
      host: '127.0.0.1:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'code', description: 'Code related end-points' },
      ],
      definitions: {
        User: {
          type: 'object',
          required: ['id', 'email'],
          properties: {
            id: { type: 'string', format: 'uuid' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
          },
        },
      },
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
    },
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false,
    },
    uiHooks: {
      onRequest: (request: any, reply: any, next: () => void) => {
        next();
      },
      preHandler: (request: any, reply: any, next: () => void) => {
        next();
      },
    },
    staticCSP: true,
    transformStaticCSP: (header: any) => header,
    exposeRoute: true,
  });
});
