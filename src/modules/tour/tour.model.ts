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

// Define a static method on the schema
tourSchema.static(
  'getNextNearestStartDateAndEndData',
  async function getNextNearestStartDateAndEndData(id: string) {
    // Fetch the tour by ID and select specific fields
    const tour = await this.findById(id).select('startDates durationHours');

    if (!tour) {
      throw new Error('Tour not found');
    }

    const today = new Date();

    // Ensure `startDates` is treated as an array of Dates
    const startDates = (tour.startDates || []) as unknown as Date[];

    const futureDates = startDates.filter((startDate) => {
      return startDate > today;
    });

    // Sort future dates
    futureDates.sort((a, b) => a.getTime() - b.getTime());

    if (futureDates.length === 0) {
      return {
        nearestStartDate: null,
        estimatedEndDate: null,
      };
    }

    const nearestStartDate = futureDates[0];
    const estimatedEndDate = new Date(
      nearestStartDate.getTime() + (tour.durationHours || 0) * 60 * 60 * 1000,
    );

    return {
      nearestStartDate,
      estimatedEndDate,
    };
  },
);

// Create and export the Tour model
const Tour = model<ITour, TTourModel>('Tour', tourSchema);

export default Tour;
