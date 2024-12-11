/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Model } from 'mongoose';

// Define ITour interface for the Tour document
export interface ITour {
  name: string;
  description: string;
  durationHours?: number;
  averageRating: number;
  price: number;
  coverImage: string;
  images: string[];
  startDates: Date[]; // Ensure these are proper Date objects
  startLocation: string;
  locations: string[];
  slug: string;
  availableSeats: number;
  isDeleted: boolean;
}

// Define ITourMethods for instance methods
export interface ITourMethods {
  getNextNearestStartDateAndEndData(): {
    nearestStartDate: Date | null;
    nearestEndDate: Date | null;
  };
}

// Define TTourModel for static methods
export interface TTourModel
  extends Model<ITour, Record<string, unknown>, ITourMethods> {}

export default TTourModel;
