import { Model, Types } from 'mongoose';

interface IUser {
  id?: string;
  user?: Types.ObjectId;
  password: string;
  name: string;
  email: string;
  role: 'user' | 'customer';  
  organizationProfile?: Types.ObjectId;
  isDeleted: boolean;
}
export interface UserModel extends Model<IUser> {
  // insert into userId when data is created:
  insertProfileIdToUserData(
    userId: string,
    profileId: Types.ObjectId,
  ): Promise<string | null>;
}
export default IUser;
