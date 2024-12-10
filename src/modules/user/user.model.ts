import { model, Schema } from 'mongoose';
import { IUSer } from './user.interface';

const userSchema = new Schema<IUSer>(
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
      required: [true, 'Role is required'],
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

const User = model<IUSer>('User', userSchema);

export default User;
