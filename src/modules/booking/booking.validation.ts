import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    tour: z.string(),
    bookedSlots: z
      .number({ invalid_type_error: 'Booked slots must be a number' })
      .min(1, { message: 'Booked slots must be at least 1' })
      .max(5, { message: 'Booked slots must be at most 5' }),
  }),
});

const updateBookingValidationSchema = z.object({
  body: z.object({
    user: z.string(),
    tour: z.string(),
    bookedSlots: z
      .number({ invalid_type_error: 'Booked slots must be a number' })
      .min(1, { message: 'Booked slots must be at least 1' })
      .max(5, { message: 'Booked slots must be at most 5' })
      .optional(),
  }),
});

export const bookingValidations = {
  createBookingValidationSchema,
  updateBookingValidationSchema,
};
