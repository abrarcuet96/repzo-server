interface IOrganizationProfile {
  id?: string;
  userId?: string;
  companyName: string;
  industryName: string;
  companyLocation: string;
  stateName: string;
  currency: 'BDT';
  timeZone: 'GMT+6';
  isDeleted: boolean;
}
export default IOrganizationProfile;
