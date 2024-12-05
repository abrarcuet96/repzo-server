import { z } from 'zod';

const loggedInUserValidationSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }).trim().optional(),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' }),
  role: z
    .enum(['user', 'customer'], {
      message: 'Role must be either user or customer',
    })
    .optional(),
  needsPasswordChange: z.boolean().optional().default(false),
  isDeleted: z.boolean().optional().default(false),
});
export default loggedInUserValidationSchema;
