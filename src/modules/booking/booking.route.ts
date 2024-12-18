import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { bookingControllers } from './booking.controller';
import { bookingValidations } from './booking.validation';

const router = Router();

router.post(
  '/',
  auth('user'),
  validateRequest(bookingValidations.createBookingValidationSchema),
  bookingControllers.createBooking,
);
router.get('/', bookingControllers.getAllBookings);
router.get('/:id', bookingControllers.getSingleBooking);
router.patch('/:id', bookingControllers.updateBooking);

export const bookingRoutes = router;
