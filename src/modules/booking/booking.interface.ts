/* eslint-disable no-unused-vars */
import mongoose, { Model } from 'mongoose';

export interface IBooking {
  user: mongoose.Schema.Types.ObjectId;
  tour: mongoose.Schema.Types.ObjectId;
  bookedSlots: number;
  bookingStatus: 'pending' | 'paid' | 'cancelled';
  totalPrice: number;
}

export interface BookingModel extends Model<IBooking, BookingModel> {
  isBookingExist(id: string): Promise<IBooking | null>;
}
