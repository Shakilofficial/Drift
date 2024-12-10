import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userControllers } from './user.controller';
import { userValidations } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(userValidations.createUserValidationSchema),
  userControllers.createUser,
);
router.get('/', userControllers.getAllUsers);
router.get('/:id', userControllers.getSingleUser);
router.patch(
  '/:id',
  validateRequest(userValidations.updateUserValidationSchema),
  userControllers.updateUser,
);
router.delete('/:id', userControllers.deleteUser);

export const userRoutes = router;
