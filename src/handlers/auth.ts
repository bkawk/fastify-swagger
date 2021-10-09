const postJoinHandler = async function (
  this: any,
  request: any,
  reply: any
): Promise<any> {
  try {
    const { username, password, email, fullName } = request.body;
    const users = await this.mongo.db.collection('users');

    const userArray = await users
      .find({ $or: [{ username }, { email }] })
      .toArray();
    if (userArray.length > 0) {
      return reply
        .code(403)
        .send({ message: 'Username or email already exists' });
    }
    const hash = await this.bcrypt.hash(password);
    const insert = await users.insertOne({
      username,
      password: hash,
      email,
      fullName,
    });
    if (insert.acknowledged) {
      const userId = insert.insertedId.toString().split('"')[0];
      const token = await this.jwt.sign({ userId });
      // TODO: Send cookie and email

      reply.setCookie('myAppCookie', token, {
        domain: process.env.DOMAIN,
        path: '/',
        signed: true,
        httpOnly: true,
      });

      return reply.code(201).send(token);
    } else {
      return reply.send(500);
    }
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
