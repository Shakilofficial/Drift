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

tourSchema.static(
  'getNextNearestStartDateAndEndData',
  function getNextNearestStartDateAndEndData() {
    const today = new Date();

    const futureDates = this.startDates.filter((startDate: Date) => {
      return startDate > today;
    });

    futureDates.sort((a: Date, b: Date) => a.getTime() - b.getDate());

    const nearestStartDate = futureDates[0];
    const estimatedEndDate = new Date(
      nearestStartDate.getTime() + this.durationHours * 60 * 60 * 1000,
    );

    return {
      nearestStartDate,
      estimatedEndDate,
    };
  },
);

const Tour = model<ITour, TTourModel>('Tour', tourSchema);

export default Tour;
