import { FastifyPluginAsync } from 'fastify';

let itemsData = [
  { id: '1', name: 'Item One' },
  { id: '2', name: 'Item Two' },
  { id: '3', name: 'Item Three' },
];

const items: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/items', getItemsSchema);
  fastify.get('/items/:id', getItemSchema);
  fastify.post('/items/', postItemsSchema);
  fastify.delete('/items/:id', deleteItemsSchema);
  fastify.put('/items/:id', updateItemsSchema);
};

const Item = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
  },
};

const NotFound = {
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
};

const getItemsHandler = async (): Promise<{ id: string; name: string }[]> => {
  return itemsData;
};

const getItemHandler = async (
  request: any,
  reply: any
): Promise<{ id: string; name: string }> => {
  try {
    const { id } = request.params;
    const res = itemsData.find((item: any) => item.id === id);
    if (!res) {
      return reply.code(404).send({ message: `ID ${id} Not Found` });
    }
    return reply.code(200).send(res);
  } catch (error) {
    request.log.error(error);
    return reply.send(400);
  }
};

const postItemHandler = async (
  request: any,
  reply: any
): Promise<{ id: string; name: string }> => {
  try {
    const { name } = request.body;
    const id = `${itemsData.length + 1}`;
    const newItem = { name, id };
    itemsData.push(newItem);
    return reply.code(200).send(newItem);
  } catch (error) {
    request.log.error(error);
    return reply.send(400);
  }
};

const deleteItemHandler = async (
  req: any,
  reply: any
): Promise<{ id: string; name: string }[]> => {
  const { id } = req.params;
  itemsData = itemsData.filter((item: any) => item.id !== id);
  return reply.code(200).send(itemsData);
};

const updateItemsHandler = async (
  req: any,
  reply: any
): Promise<{ id: string; name: string }> => {
  const { id } = req.params;
  const { name } = req.body;
  itemsData = itemsData.map((item) => (item.id === id ? { id, name } : item));
  const item = itemsData.find((item) => item.id === id);
  return reply.code(200).send(item);
};

const getItemsSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Item,
      },
    },
  },
  handler: getItemsHandler,
};

const getItemSchema = {
  schema: {
    response: {
      200: Item,
      404: NotFound,
    },
  },

  handler: getItemHandler,
};

const postItemsSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
      },
    },
    response: {
      201: Item,
    },
  },
  handler: postItemHandler,
};

const deleteItemsSchema = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Item,
      },
    },
  },
  handler: deleteItemHandler,
};

const updateItemsSchema = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: updateItemsHandler,
};

export default items;
