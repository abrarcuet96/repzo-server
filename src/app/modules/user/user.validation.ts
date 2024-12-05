import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    user: z.object({
      id: z.string().min(1, { message: 'ID is required' }).trim().optional(),
      user: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, {
          message: 'Invalid ObjectId format for user',
        })
        .optional(),
      name: z.string().min(1, { message: 'Name is required' }).trim(),
      email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is required'),
      organizationProfile: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, {
          message: 'Invalid ObjectId format for organizationProfile',
        })
        .nullable()
        .optional(),
      role: z
        .enum(['user', 'customer'], {
          message: 'Role must be either user or customer',
        })
        .optional(),
      isDeleted: z.boolean().optional().default(false),
    }),
  }),
});
const updateUserValidationSchema = z.object({
  body: z.object({
    user: z.object({
      id: z.string().min(1, { message: 'ID is required' }).trim().optional(),
      user: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, {
          message: 'Invalid ObjectId format for user',
        })
        .optional(),
      name: z
        .string()
        .min(1, { message: 'Name is required' })
        .trim()
        .optional(),
      email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is required')
        .optional(),
      role: z
        .enum(['user', 'customer'], {
          message: 'Role must be either user or customer',
        })
        .optional(),
      organizationProfile: z
        .string()
        .regex(/^[0-9a-fA-F]{24}$/, {
          message: 'Invalid ObjectId format for organizationProfile',
        })
        .nullable()
        .optional(),
      isDeleted: z.boolean().optional().default(false).optional(),
    }),
  }),
});

export const userValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
