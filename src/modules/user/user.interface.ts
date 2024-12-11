/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export interface IUSer {
  name: string;
  age: number;
  email: string;
  phone: string;
  photo?: string | null;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  isDeleted?: boolean;
}
export interface UserModel extends Model<IUSer, UserModel> {
  isUserExist(id: string): Promise<IUSer | null>;
}
