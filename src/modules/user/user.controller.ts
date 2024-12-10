import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { userServices } from './user.service';

// Create user
const createUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await userServices.createUserIntoDB(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User created successfully 👤',
    data: result,
  });
});

// Get all users
const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsersFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users retrieved successfully 🎉',
    data: result,
  });
});

//Get single user
const getSingleUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.getSingleUserFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully ✅',
    data: result,
  });
});

// Update user
const updateUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await userServices.updateUserIntoDB(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User updated successfully 🔄',
    data: result,
  });
});

//Delete user
const deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await userServices.deleteUserFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User deleted successfully 🗑️',
    data: result,
  });
});

export const userController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
