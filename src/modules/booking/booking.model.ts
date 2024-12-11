import { model, Schema } from 'mongoose';
import { BookingModel, IBooking } from './booking.interface';

const bookingSchema = new Schema<IBooking, BookingModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    tour: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Tour',
    },
    bookedSlots: {
      type: Number,
      required: true,
    },
    bookingStatus: {
      type: String,
      required: true,
      enum: ['pending', 'paid', 'cancelled'],
      default: 'pending',
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
export const Booking = model<IBooking, BookingModel>('Booking', bookingSchema);
