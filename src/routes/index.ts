import { Router } from 'express';
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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
