import { postJoinHandler, postLoginHandler } from '../handlers/auth';

const User = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
};

const Token = {
  type: 'object',
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
};

const Unauthorized = {
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
};

const postJoinSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['username', 'password', 'email', 'fullName'],
      properties: {
        name: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      201: Token,
    },
  },
  handler: postJoinHandler,
};

const postLoginSchema = {
  schema: {
    body: {
      type: 'object',
      required: ['username', 'password'],
      properties: {
        name: { type: 'string' },
        password: { type: 'string' },
      },
    },
    response: {
      200: User,
      401: Unauthorized,
    },
  },

  handler: postLoginHandler,
};

export { postJoinSchema, postLoginSchema };
