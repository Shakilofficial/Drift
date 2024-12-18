import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import AppError from '../../helpers/error/AppError';
import { IUSer } from '../user/user.interface';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const register = async (payload: IUSer) => {
  const result = await User.create(payload);
  return result;
};

const login = async (payload: ILoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found 😢');
  }
  const userStatus = user?.status;
  if (userStatus === 'inactive') {
    throw new AppError(StatusCodes.FORBIDDEN, 'User is inactive 😢');
  }
  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    user?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid password 😢');
  }

  //create token and send it to client

  const jwtPayload = { email: user?.email, role: user?.role };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_secret_expires_in as string,
  );

  return {
    accessToken,
  };
};

export const authServices = {
  register,
  login,
};
