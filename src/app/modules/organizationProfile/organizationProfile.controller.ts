import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync/catchAsync';
import sendResponse from '../../utils/sendResponse/sendResponse';
import User from '../user/user.model';
import { organizationProfileServices } from './organizationProfile.service';

const createOrganizationProfile = catchAsync(async (req, res) => {
  const profileData = req.body;
  const { id } = req.params;
  console.log(id);

  const userData = await User.findOne({ id });
  console.log(userData);
  profileData.id = userData?.id;
  const result =
    await organizationProfileServices.crteateOrganizationProfileIntoDB(
      profileData,
    );

  const profileId = result._id;
  await User.insertProfileIdToUserData(id, profileId);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Organization profile is created successfully',
    data: result,
  });
});
const getOrganizationProfiles = catchAsync(async (req, res) => {
  const result =
    await organizationProfileServices.getOrganizationProfilesFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Organization profiles are retrieved successfully',
    data: result,
  });
});
const getSingleOrganizationProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await organizationProfileServices.getSingleOrganizationProfileFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Organization profile is retrieved successfully',
    data: result,
  });
});
const updateOrganizationProfile = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await organizationProfileServices.updateOrganizationProfile(
    id,
    body,
  );
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Organization profile is updated successfully',
    data: result,
  });
});
const deleteOrganizationProfile = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result =
    await organizationProfileServices.deleteOrganizationProfile(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Organization profile is deleted successfully',
    data: result,
  });
});
export const organizationProfileControllers = {
  createOrganizationProfile,
  getOrganizationProfiles,
  getSingleOrganizationProfile,
  updateOrganizationProfile,
  deleteOrganizationProfile,
};
