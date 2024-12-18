import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { tourServices } from './tour.service';

// Create Tour
const createTour = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await tourServices.createTourIntoDB(payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Tour created successfully 🗺️',
    data: result,
  });
});

// Get all Tours
const getAllTours = catchAsync(async (req, res) => {
  const result = await tourServices.getAllToursFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tours retrieved successfully 🎉',
    data: result,
  });
});

//Get single Tour
const getSingleTour = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await tourServices.getSingleTourFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tour retrieved successfully ✅',
    data: result,
  });
});

// Update Tour
const updateTour = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await tourServices.updateTourIntoDB(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tour updated successfully 🔄',
    data: result,
  });
});

//Delete Tour
const deleteTour = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await tourServices.deleteTourFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tour deleted successfully 🗑️',
    data: result,
  });
});

//Get next schedule
const getNextSchedule = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await tourServices.getNextScheduleFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Next Schedule retrieved successfully 📅',
    data: result,
  });
});

export const tourControllers = {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
};
