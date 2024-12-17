import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { bookingRoutes } from '../modules/booking/booking.route';
import { tourRoutes } from '../modules/tour/tour.route';
import { userRoutes } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/tours',
    route: tourRoutes,
  },
  {
    path: '/bookings',
    route: bookingRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
