import { FastifyPluginAsync } from 'fastify';
import {
  getItemsSchema,
  getItemSchema,
  postItemsSchema,
  deleteItemsSchema,
  updateItemsSchema,
} from '../schemas/items';

const items: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/items', getItemsSchema);
  fastify.get('/items/:id', getItemSchema);
  fastify.post('/items/', postItemsSchema);
  fastify.delete('/items/:id', deleteItemsSchema);
  fastify.put('/items/:id', updateItemsSchema);
};

export default items;
