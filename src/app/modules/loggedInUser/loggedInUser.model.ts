import bcrypt from 'bcrypt';
import moment from 'moment-timezone';
import { model, Schema } from 'mongoose';
import config from '../../config';
import ILoggedInUser from './loggedInUser.interface';
const loggedInUserUserSchema = new Schema<ILoggedInUser>(
  {
    id: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'customer'],
      required: true,
    },
    needsPasswordChange: {
      type: Boolean,
      default: false,
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

loggedInUserUserSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; // doc
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
// set ' after saving password
loggedInUserUserSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});
export const LoggedInUser = model<ILoggedInUser>(
  'LoggedInUser',
  loggedInUserUserSchema,
);
