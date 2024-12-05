import moment from 'moment-timezone';
import { Schema, model } from 'mongoose';
import IOrganizationProfile from './organizationProfile.interface';

const OrganizationProfileSchema = new Schema<IOrganizationProfile>(
  {
    id: {
      type: String,
      required: false,
      trim: true,
    },
    userId: {
      type: String,
      required: false,
      trim: true,
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    industryName: {
      type: String,
      required: true,
      trim: true,
    },
    companyLocation: {
      type: String,
      required: true,
      trim: true,
    },
    stateName: {
      type: String,
      required: true,
      trim: true,
    },
    currency: {
      type: String,
      enum: ['BDT'],
      required: true,
      default: 'BDT',
    },
    timeZone: {
      type: String,
      enum: ['GMT+6'],
      required: true,
      default: 'GMT+6',
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
          day: createdAt.format('dddd'), // Full day name (e.g., Monday)
          date: createdAt.format('D'), // Day of the month (e.g., 5)
          month: createdAt.format('MMMM'), // Full month name (e.g., December)
          week: createdAt.format('w'), // Week of the year
          time: createdAt.format('hh:mm:ss A'), // Time in 12-hour format with AM/PM
        };

        ret.updatedAt = {
          day: updatedAt.format('dddd'),
          date: updatedAt.format('D'),
          month: updatedAt.format('MMMM'),
          week: updatedAt.format('w'),
          time: createdAt.format('hh:mm:ss A'), // Time in 12-hour format with AM/PM
        };

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
          time: createdAt.format('hh:mm:ss A'), // Time in 12-hour format with AM/PM
        };

        ret.updatedAt = {
          day: updatedAt.format('dddd'),
          date: updatedAt.format('D'),
          month: updatedAt.format('MMMM'),
          week: updatedAt.format('w'),
          time: createdAt.format('hh:mm:ss A'), // Time in 12-hour format with AM/PM
        };

        return ret;
      },
    },
  },
);
OrganizationProfileSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
OrganizationProfileSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
export const OrganizationProfile = model<IOrganizationProfile>(
  'OrganizationProfile',
  OrganizationProfileSchema,
);
