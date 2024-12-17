import { StatusCodes } from 'http-status-codes';
import AppError from '../../helpers/error/AppError';
import { IUSer } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';

const register = async (payload: IUSer) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Status code not found');
  }
};

export const authServices = {
  register,
  login,
};
