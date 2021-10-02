import {
  getItemsHandler,
  getItemHandler,
  postItemHandler,
  deleteItemHandler,
  updateItemsHandler,
} from '../handlers/items';

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
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: { type: 'string' },
      },
    },
    response: {
      200: Item,
    },
  },
  handler: updateItemsHandler,
};

export {
  getItemsSchema,
  getItemSchema,
  postItemsSchema,
  deleteItemsSchema,
  updateItemsSchema,
};
