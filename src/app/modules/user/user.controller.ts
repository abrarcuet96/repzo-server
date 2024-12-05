import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync/catchAsync';
import sendResponse from '../../utils/sendResponse/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  const { password, user: userData } = req.body;
  console.log(userData);

  const result = await UserServices.createUserIntoDB(password, userData);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User created successfully',
    data: result,
  });
});
const getUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getUserFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Users are retrieved successfully',
    data: result,
  });
});
const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User is retrieved successfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await UserServices.updateUser(id, body);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User is updated successfully',
    data: result,
  });
});
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deleteUser(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User is deleted successfully',
    data: result,
  });
});
export const UserControllers = {
  createUser,
  getUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
