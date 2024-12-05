import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import IOrganizationProfile from '../organizationProfile/organizationProfile.interface';
import { OrganizationProfile } from '../organizationProfile/organizationProfile.model';

const crteateOrganizationProfileIntoDB = async (
  payload: IOrganizationProfile,
) => {
  const result = await OrganizationProfile.create(payload);
  return result;
};
const getOrganizationProfilesFromDB = async () => {
  const result = await OrganizationProfile.find();
  return result;
};
const getSingleOrganizationProfileFromDB = async (id: string) => {
  const result = await OrganizationProfile.findOne({ id });

  return result;
};
const updateOrganizationProfile = async (
  id: string,
  payload: IOrganizationProfile,
) => {
  const result = await OrganizationProfile.findOneAndUpdate({ id }, payload, {
    new: true,
  });
  return result;
};
const deleteOrganizationProfile = async (id: string) => {
  const deleteOrganizationProfile = await OrganizationProfile.findOneAndUpdate(
    { id },
    { isDeleted: true },
    { new: true },
  );
  if (!deleteOrganizationProfile) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to delete user');
  }
  return deleteOrganizationProfile;
};
export const organizationProfileServices = {
  crteateOrganizationProfileIntoDB,
  getOrganizationProfilesFromDB,
  getSingleOrganizationProfileFromDB,
  updateOrganizationProfile,
  deleteOrganizationProfile,
};
