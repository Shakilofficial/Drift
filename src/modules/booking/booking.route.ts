import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { bookingControllers } from './booking.controller';
import { bookingValidations } from './booking.validation';

const router = Router();

router.post(
  '/',
  validateRequest(bookingValidations.createBookingValidationSchema),
  bookingControllers.createBooking,
);
router.get('/', bookingControllers.getAllBookings);
router.get('/:id', bookingControllers.getSingleBooking);
router.patch('/:id', bookingControllers.updateBooking);

export const bookingRoutes = router;
