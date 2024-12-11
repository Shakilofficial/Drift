import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { bookingServices } from './booking.service';

const createBooking = catchAsync(async (req, res) => {
  const body = req.body;
  const result = await bookingServices.createBookingIntoDB(body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Booking created successfully 🗓️',
    data: result,
  });
});

//Get all Bookings
const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookingsFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bookings retrieved successfully 📅',
    data: result,
  });
});

// Get single Booking
const getSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await bookingServices.getSingleBookingFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking retrieved successfully ✅',
    data: result,
  });
});

// Update Booking
const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await bookingServices.updateBookingIntoDB(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Booking updated successfully 🔄',
    data: result,
  });
});

export const bookingControllers = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
};
