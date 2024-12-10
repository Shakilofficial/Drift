import { z } from 'zod';

const createTourValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ invalid_type_error: 'Name must be a string' })
      .trim()
      .min(3, 'Name must be at least 3 characters long')
      .max(30, 'Name cannot exceed 30 characters')
      .refine((value) => /^[A-Z][A-Za-z ]*$/.test(value), {
        message:
          'Name must start with a capital letter and contain only letters and spaces',
      }),
    description: z
      .string({ invalid_type_error: 'Description must be a string' })
      .trim()
      .min(3, 'Description must be at least 3 characters long')
      .max(5000, 'Description cannot exceed 5000 characters'),
    durationHours: z
      .number({ invalid_type_error: 'Duration must be a number' })
      .min(1, 'Duration must be at least 1 hour')
      .max(24, 'Duration cannot exceed 24 hours'),
    averageRating: z
      .number({ invalid_type_error: 'Average Rating must be a number' })
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot exceed 5')
      .optional(),
    price: z
      .number({ invalid_type_error: 'Price must be a number' })
      .min(0, 'Price cannot be negative')
      .max(1000, 'Price cannot exceed 1000'),
    coverImage: z
      .string({ invalid_type_error: 'Cover Image must be a string' })
      .trim()
      .url('Cover Image must be a valid URL'),
    images: z
      .array(
        z
          .string({ invalid_type_error: 'Image must be a string' })
          .trim()
          .url('Image must be a valid URL'),
        { invalid_type_error: 'Images must be an array of strings' },
      )
      .min(1, 'At least one image is required'),
    startDates: z
      .array(
        z
          .string({ invalid_type_error: 'Start Date must be a string' })
          .trim()
          .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
            message: 'Start Date must be in the format YYYY-MM-DD',
          }),
        { invalid_type_error: 'Start Dates must be an array of strings' },
      )
      .min(1, 'At least one start date is required'),
    startLocation: z
      .string({ invalid_type_error: 'Start Location must be a string' })
      .trim()
      .min(3, 'Start Location must be at least 3 characters long')
      .max(100, 'Start Location cannot exceed 100 characters'),
    locations: z
      .array(
        z
          .string({ invalid_type_error: 'Location must be a string' })
          .trim()
          .min(3, 'Location must be at least 3 characters long')
          .max(100, 'Location cannot exceed 100 characters'),
        { invalid_type_error: 'Locations must be an array of strings' },
      )
      .min(1, 'At least one location is required'),
    slug: z
      .string({ invalid_type_error: 'Slug must be a string' })
      .trim()
      .min(3, 'Slug must be at least 3 characters long')
      .max(30, 'Slug cannot exceed 30 characters')
      .refine((value) => /^[a-z0-9-]+$/.test(value), {
        message:
          'Slug must contain only lowercase letters, numbers, and hyphens',
      }),
    availableSeats: z
      .number({ invalid_type_error: 'Available Seats must be a number' })
      .int('Available Seats must be an integer')
      .min(1, 'At least one seat must be available'),
  }),
});

const updateTourValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ invalid_type_error: 'Name must be a string' })
      .trim()
      .min(3, 'Name must be at least 3 characters long')
      .max(30, 'Name cannot exceed 30 characters')
      .refine((value) => /^[A-Z][A-Za-z ]*$/.test(value), {
        message:
          'Name must start with a capital letter and contain only letters and spaces',
      })
      .optional(),
    description: z
      .string({ invalid_type_error: 'Description must be a string' })
      .trim()
      .min(3, 'Description must be at least 3 characters long')
      .max(5000, 'Description cannot exceed 5000 characters')
      .optional(),
    durationHours: z
      .number({ invalid_type_error: 'Duration must be a number' })
      .min(1, 'Duration must be at least 1 hour')
      .max(24, 'Duration cannot exceed 24 hours')
      .optional(),
    averageRating: z
      .number({ invalid_type_error: 'Average Rating must be a number' })
      .min(1, 'Rating must be at least 1')
      .max(5, 'Rating cannot exceed 5')
      .optional(),
    price: z
      .number({ invalid_type_error: 'Price must be a number' })
      .min(0, 'Price cannot be negative')
      .max(1000, 'Price cannot exceed 1000')
      .optional(),
    coverImage: z
      .string({ invalid_type_error: 'Cover Image must be a string' })
      .trim()
      .url('Cover Image must be a valid URL')
      .optional(),
    images: z
      .array(
        z
          .string({ invalid_type_error: 'Image must be a string' })
          .trim()
          .url('Image must be a valid URL'),
        { invalid_type_error: 'Images must be an array of strings' },
      )
      .optional(),
    startDates: z
      .array(
        z
          .string({ invalid_type_error: 'Start Date must be a string' })
          .trim()
          .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
            message: 'Start Date must be in the format YYYY-MM-DD',
          }),
        { invalid_type_error: 'Start Dates must be an array of strings' },
      )
      .optional(),
    startLocation: z
      .string({ invalid_type_error: 'Start Location must be a string' })
      .trim()
      .min(3, 'Start Location must be at least 3 characters long')
      .max(100, 'Start Location cannot exceed 100 characters')
      .optional(),
    locations: z
      .array(
        z
          .string({ invalid_type_error: 'Location must be a string' })
          .trim()
          .min(3, 'Location must be at least 3 characters long')
          .max(100, 'Location cannot exceed 100 characters'),
        { invalid_type_error: 'Locations must be an array of strings' },
      )
      .optional(),
    slug: z
      .string({ invalid_type_error: 'Slug must be a string' })
      .trim()
      .min(3, 'Slug must be at least 3 characters long')
      .max(30, 'Slug cannot exceed 30 characters')
      .refine((value) => /^[a-z0-9-]+$/.test(value), {
        message:
          'Slug must contain only lowercase letters, numbers, and hyphens',
      })
      .optional(),
    availableSeats: z
      .number({ invalid_type_error: 'Available Seats must be a number' })
      .int('Available Seats must be an integer')
      .min(1, 'At least one seat must be available')
      .optional(),
  }),
});

export const tourValidations = {
  createTourValidationSchema,
  updateTourValidationSchema,
};
