import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../helpers/error/AppError';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...roles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'No token provided 😢');
    }

    //decode if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, email } = decoded;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid token 😢');
    }

    //check if the user status is inactive
    if (user.status === 'inactive') {
      throw new AppError(StatusCodes.FORBIDDEN, 'User is inactive 😢');
    }
    // check if the user role is allowed

    if (roles && !roles.includes(role)) {
      throw new AppError(StatusCodes.FORBIDDEN, 'User is not allowed 😢');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};
export default auth;
