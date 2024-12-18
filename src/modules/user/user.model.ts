/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import config from '../../config';
import { IUSer, UserModel } from './user.interface';

const userSchema = new Schema<IUSer, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
      maxlength: [30, 'Name must be at most 30 characters long'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [12, 'Age must be at least 12 years old'],
      max: [80, 'Age must be at most 80 years old'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
      maxlength: [30, 'Password must be at most 30 characters long'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      minlength: [10, 'Phone number must be at least 10 digits long'],
      maxlength: [15, 'Phone number must be at most 15 digits long'],
    },
    photo: {
      type: String,
      required: [false, 'Photo is optional'],
    },
    role: {
      type: String,
      enum: {
        values: ['admin', 'user'],
        message: '{VALUE} is not valid, please provide a valid role',
      },
      default: 'user',
    },
    status: {
      type: String,
      required: [true, 'Status is required'],
      enum: ['active', 'inactive'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

//hashpassword
userSchema.pre('save', async function name(next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//filter out deleted users
userSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Define instance method for checking if user exists
userSchema.statics.isUserExist = async function (id: string) {
  const existingUser = await User.findOne({ id });
  return existingUser;
};

export const User = model<IUSer, UserModel>('User', userSchema);
