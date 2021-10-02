import { FastifyPluginAsync } from 'fastify';

const rootHandler = async (): Promise<{ root: boolean }> => {
  return { root: true };
};

const rootSchema = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          root: { type: 'boolean' },
        },
      },
    },
  },
  handler: rootHandler,
};

const root: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', rootSchema);
};

export default root;
