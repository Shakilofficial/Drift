import { HydratedDocument, Model } from 'mongoose';

export interface ITour {
  name: string;
  description: string;
  durationHours: number;
  averageRating: number;
  price: number;
  coverImage: string;
  images: string[];
  startDates: string[];
  startLocation: string;
  locations: string[];
  slug: string;
  availableSeats: number;
  isDeleted: boolean;
}

export interface ITourMethods {
  getNextNearestStartDateAndEndData(): {
    nearestStartDate: Date | null;
    nearestEndDate: Date | null;
  };
}

interface TTourModel
  extends Model<ITour, Record<string, unknown>, ITourMethods> {
  startDates: Date[];
  durationHours: number;
  getNextNearestStartDateAndEndData(): Promise<
    HydratedDocument<ITour, ITourMethods>
  >;
}

export default TTourModel;
