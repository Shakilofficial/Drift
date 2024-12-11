import { ITour } from './tour.interface';
import { Tour } from './tour.model';

const createTourIntoDB = async (payload: ITour) => {
  const result = await Tour.create(payload);
  return result;
};

const getAllToursFromDB = async () => {
  const result = await Tour.find();
  return result;
};

const getSingleTourFromDB = async (id: string) => {
  const result = await Tour.findById(id);
  return result;
};

const updateTourIntoDB = async (id: string, payload: Partial<ITour>) => {
  const result = await Tour.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteTourFromDB = async (id: string) => {
  const result = await Tour.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

const getNextScheduleFromDB = async (id: string) => {
  const tour = await Tour.findById(id);
  if (!tour) {
    throw new Error('Tour not found');
  }
  const schedule = tour.getNextNearestStartDateAndEndData();

  return {
    tourDetails: tour,
    schedule,
  };
};

export const tourServices = {
  createTourIntoDB,
  getAllToursFromDB,
  getSingleTourFromDB,
  updateTourIntoDB,
  deleteTourFromDB,
  getNextScheduleFromDB,
};
