import { Router } from 'express';

const router = Router();

const moduleRoutes = [
  {
    path: '/path',
    route: Routes, // Replace with actual route
  },
  /* 🚀 Add more routes here */
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
