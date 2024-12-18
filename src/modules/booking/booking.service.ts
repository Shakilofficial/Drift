import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import AppError from '../../helpers/error/AppError';
import { Tour } from '../tour/tour.model';
import { IBooking } from './booking.interface';
import { Booking } from './booking.model';

const createBookingIntoDB = async (payload: IBooking): Promise<IBooking> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { tour, bookedSlots } = payload;
    const requiredTour = await Tour.findById(tour);
    if (!requiredTour) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Tour Not Found');
    }
    const totalPrice = requiredTour.price * bookedSlots;
    payload.totalPrice = totalPrice;
    payload.bookingStatus = 'pending';

    if (requiredTour.availableSeats < bookedSlots) {
      throw new Error('Not enough seats available');
    }
    const booking = await Booking.create([payload], { session });
    const updatedTour = await Tour.findByIdAndUpdate(
      booking[0].tour,
      { $inc: { availableSeats: -bookedSlots } },
      { new: true, session },
    );
    if (!updatedTour) {
      throw new Error('Failed to update tour');
    }
    await session.commitTransaction();
    await session.endSession();
    return booking[0];
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find()
    .populate('user', 'name email')
    .populate('tour');
  return result;
};

const getSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findById(id).populate('user').populate('tour');
  return result;
};

const updateBookingIntoDB = async (id: string, payload: Partial<IBooking>) => {
  const result = await Booking.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

export const bookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleBookingFromDB,
  updateBookingIntoDB,
};
