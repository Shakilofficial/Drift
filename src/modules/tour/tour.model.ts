import { model, Schema } from 'mongoose';
import TTourModel, { ITour, ITourMethods } from './tour.interface';

const tourSchema = new Schema<ITour, TTourModel, ITourMethods>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    durationHours: {
      type: Number,
      required: true,
    },
    averageRating: {
      type: Number,
      required: true,
      default: 5,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    startDates: {
      type: [Date],
    },
    startLocation: {
      type: String,
    },
    locations: {
      type: [String],
    },
    slug: {
      type: String,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true },
);

// Define instance method for finding nearest start and end dates
tourSchema.methods.getNextNearestStartDateAndEndData = function () {
  const today = new Date();

  // Filter and sort future dates
  const futureDates = this.startDates
    .filter((startDate: Date) => startDate > today)
    .sort((a: Date, b: Date) => a.getTime() - b.getTime());

  const nearestStartDate = futureDates[0] || null; // Get the first future date
  const nearestEndDate =
    nearestStartDate && this.durationHours
      ? new Date(
          nearestStartDate.getTime() + this.durationHours * 60 * 60 * 1000,
        )
      : null;

  return {
    nearestStartDate,
    nearestEndDate,
  };
};

// Create and export the Tour model
const Tour = model<ITour, TTourModel>('Tour', tourSchema);

export default Tour;
