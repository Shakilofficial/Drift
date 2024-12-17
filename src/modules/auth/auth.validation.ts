import { z } from 'zod';

const registerValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ invalid_type_error: 'Name must be a string' })
      .trim()
      .min(3, { message: 'Name must be at least 3 characters long' })
      .max(30, { message: 'Name must be at most 30 characters long' })
      .refine((value) => /^[A-Z ]/.test(value), {
        message: 'Name must start with a capital letter',
      }),
    age: z
      .number({ invalid_type_error: 'Age must be a number' })
      .min(12, { message: 'Age must be at least 12 years old' })
      .max(80, { message: 'Age must be at most 80 years old' }),
    email: z
      .string({ invalid_type_error: 'Email must be a string' })
      .trim()
      .email({ message: 'Email is not valid' }),
    password: z
      .string({ invalid_type_error: 'Password must be a string' })
      .trim()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .max(20, { message: 'Password must be at most 20 characters long' }),
    phone: z
      .string({ invalid_type_error: 'Phone number must be a string' })
      .trim()
      .min(10, { message: 'Phone number must be at least 10 digits long' })
      .max(15, { message: 'Phone number must be at most 15 digits long' })
      .regex(/^\d{10}$/, { message: 'Phone number must be 10 digits long' }),
    photo: z
      .string({ invalid_type_error: 'Photo must be a string' })
      .optional(),
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Email is not valid' }),
    password: z
      .string({ required_error: 'Password is required' })
      .min(6, { message: 'Password must be at least 8 characters long' })
      .max(20, { message: 'Password must be at most 20 characters long' }),
  }),
});

export const authValidations = {
  registerValidationSchema,
  loginValidationSchema,
};
