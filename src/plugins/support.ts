import fp from 'fastify-plugin';

export interface SupportPluginOptions {}

export default fp<SupportPluginOptions>(async (fastify) => {
  fastify.decorate('someSupport', () => {
    return 'hugs';
  });
});

declare module 'fastify' {
  export interface FastifyInstance {
    someSupport(): string;
  }
}
