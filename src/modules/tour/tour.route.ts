import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { tourControllers } from './tour.controller';
import { tourValidations } from './tour.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(tourValidations.createTourValidationSchema),
  tourControllers.createTour,
);
router.get('/', tourControllers.getAllTours);
router.get('/:id', tourControllers.getSingleTour);
router.get('/schedule/:id', tourControllers.getNextSchedule);
router.patch(
  '/:id',
  validateRequest(tourValidations.updateTourValidationSchema),
  tourControllers.updateTour,
);
router.delete('/:id', tourControllers.deleteTour);

export const tourRoutes = router;
