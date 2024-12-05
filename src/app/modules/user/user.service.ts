/* eslint-disable @typescript-eslint/no-unused-vars */
// User services:

import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import ILoggedInUser from '../loggedInUser/loggedInUser.interface';
import { LoggedInUser } from '../loggedInUser/loggedInUser.model';
import { OrganizationProfile } from '../organizationProfile/organizationProfile.model';
import IUser from '../user/user.interface';
import User from '../user/user.model';
import generatedId from './user.utils';

// create user:
const createUserIntoDB = async (password: string, payload: IUser) => {
  // create a logged in user data object:
  const loggedInUserData: Partial<ILoggedInUser> = {};
  loggedInUserData.password = password || (config.default_pass as string);
  // set student role
  loggedInUserData.role = payload.role;
  // start a session:
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    loggedInUserData.id = await generatedId(loggedInUserData.role);

    const loggedInUser = await LoggedInUser.create([loggedInUserData], {
      session,
    });

    if (!loggedInUser.length) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = loggedInUser[0].id;
    payload.user = loggedInUser[0]._id;
    console.log(payload);
    const user = await User.create([payload], { session });
    console.log(user);

    if (!user) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to create user');
    }

    await session.commitTransaction();
    await session.endSession();
    return user;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create user');
  }
};
const getUserFromDB = async () => {
  const result = await User.find().populate('organizationProfile');
  return result;
};
const getSingleUserFromDB = async (id: string) => {
  const result = await User.findOne({ id }).populate('organizationProfile');

  return result;
};
const updateUser = async (id: string, payload: IUser) => {
  const result = await User.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};
const deleteUser = async (id: string) => {
  const session = await mongoose.startSession();
  console.log(id);

  try {
    session.startTransaction();
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
    }
    const deleteOrganizationProfile =
      await OrganizationProfile.findOneAndUpdate(
        { id },
        { isDeleted: true },
        { new: true, session },
      );
    if (!deleteOrganizationProfile) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to delete organization profile',
      );
    }
    await session.commitTransaction();
    await session.endSession();
    return deleteUser;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete user');
  }
};
export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
  getSingleUserFromDB,
  updateUser,
  deleteUser,
};
