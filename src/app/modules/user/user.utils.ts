import { LoggedInUser } from '../loggedInUser/loggedInUser.model';

const findLastId = async (role: string) => {
  const isLioggedInUserExist = await LoggedInUser.find();
  if (!isLioggedInUserExist) {
    return undefined;
  } else {
    if (role === 'user') {
      const lastId = await LoggedInUser.findOne(
        {
          role: 'user',
        },
        {
          id: 1,
          _id: 0,
        },
      )
        .sort({
          createdAt: -1,
        })
        .lean();
      return lastId?.id ? lastId.id : undefined;
    } else if (role === 'customer') {
      const lastId = await LoggedInUser.findOne(
        {
          role: 'customer',
        },
        {
          id: 1,
          _id: 0,
        },
      )
        .sort({
          createdAt: -1,
        })
        .lean();
      return lastId?.id ? lastId.id : undefined;
    }
  }
};
const generatedId = async (role: string) => {
  let currentId = (0).toString();

  const lastId = await findLastId(role);
  if (lastId) {
    currentId = lastId.substring(3);
  }
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  if (role === 'user') {
    incrementId = `USE${incrementId}`;
  } else if (role === 'customer') {
    incrementId = `CUS${incrementId}`;
  }

  return incrementId;
};
export default generatedId;
