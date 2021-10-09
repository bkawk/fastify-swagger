const postJoinHandler = async (
  request: any,
  reply: any
): Promise<{ id: string; name: string }> => {
  try {
    const { username, password } = request.body;
    const token = await reply.jwtSign({ username, password });

    // const test = await this.mongo.db.collection('users');
    const t = this;
    if (t) {
      const test = t.mongo.client.db('mydb').collection('users');
      test.insertOne({
        username,
        password,
      });
      console.log(test);
    }

    return reply.code(201).send(token);
  } catch (error) {
    request.log.error(error);
    return reply.send(400);
  }
};

const postLoginHandler = async (
  request: any,
  reply: any
): Promise<{ id: string; name: string }> => {
  try {
    const { username, password } = request.body;
    const newItem = { username, password };
    return reply.code(200).send(newItem);
  } catch (error) {
    request.log.error(error);
    return reply.send(400);
  }
};

export { postJoinHandler, postLoginHandler };
