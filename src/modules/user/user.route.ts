import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { userValidations } from './user.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(userValidations.createUserValidationSchema),
  userController.createUser,
);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getSingleUser);
router.patch(
  '/:id',
  validateRequest(userValidations.updateUserValidationSchema),
  userController.updateUser,
);
router.delete('/:id', userController.deleteUser);

export const userRoutes = router;
