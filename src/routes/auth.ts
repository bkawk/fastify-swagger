import { FastifyPluginAsync } from 'fastify';
import { postJoinSchema, postLoginSchema } from '../schemas/auth';

const auth: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post('/auth/join', postJoinSchema);
  fastify.post('/auth/login', postLoginSchema);
};

export default auth;
