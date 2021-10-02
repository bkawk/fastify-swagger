let itemsData = [
  { id: '1', name: 'Item One' },
  { id: '2', name: 'Item Two' },
  { id: '3', name: 'Item Three' },
];

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

export {
  getItemsHandler,
  getItemHandler,
  postItemHandler,
  deleteItemHandler,
  updateItemsHandler,
};
