import moment from 'moment-timezone';
import { model, Schema, Types } from 'mongoose';
import IUser, { UserModel } from './user.interface';
const UserSchema = new Schema<IUser, UserModel>(
  {
    id: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ['user', 'customer'],
      required: true,
    },
    organizationProfile: {
      type: Schema.Types.ObjectId,
      ref: 'OrganizationProfile',
      default: function (this: IUser) {
        return this.role === 'user' ? null : undefined;
      },
      select: false, 
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        const createdAt = moment(ret.createdAt).tz('Asia/Dhaka');
        const updatedAt = moment(ret.updatedAt).tz('Asia/Dhaka');

        ret.createdAt = {
          day: createdAt.format('dddd'), 
          date: createdAt.format('D'), 
          month: createdAt.format('MMMM'), 
          week: createdAt.format('w'), 
          time: createdAt.format('hh:mm:ss A'), 
        };

        ret.updatedAt = {
          day: updatedAt.format('dddd'),
          date: updatedAt.format('D'),
          month: updatedAt.format('MMMM'),
          week: updatedAt.format('w'),
          time: createdAt.format('hh:mm:ss A'), 
        };
        if (ret.role !== 'user') {
          delete ret.organizationProfile;
        }
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        const createdAt = moment(ret.createdAt).tz('Asia/Dhaka');
        const updatedAt = moment(ret.updatedAt).tz('Asia/Dhaka');

        ret.createdAt = {
          day: createdAt.format('dddd'),
          date: createdAt.format('D'),
          month: createdAt.format('MMMM'),
          week: createdAt.format('w'),
          time: createdAt.format('hh:mm:ss A'), 
        };

        ret.updatedAt = {
          day: updatedAt.format('dddd'),
          date: updatedAt.format('D'),
          month: updatedAt.format('MMMM'),
          week: updatedAt.format('w'),
          time: createdAt.format('hh:mm:ss A'), 
        };

        return ret;
      },
    },
  },
);
UserSchema.statics.insertProfileIdToUserData = async function (
  userId: string,
  profileId: Types.ObjectId,
): Promise<string | null> {
  const user = await this.findOne({ id: userId });
  console.log(user);

  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  if (user.role !== 'user') {
    throw new Error(`Cannot add organizationProfile for role "${user.role}"`);
  }
  await this.findOneAndUpdate(
    { id: userId },
    {
      $set: { organizationProfile: profileId },
    },
  );
  return `OrganizationProfile added successfully to user with ID ${userId}`;
};
UserSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
UserSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

const User = model<IUser, UserModel>('User', UserSchema);

export default User;
