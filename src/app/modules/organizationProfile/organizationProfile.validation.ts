import { z } from 'zod';

const createOrganizationProfileValidationSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    userId: z.string().optional(),
    companyName: z
      .string({
        required_error: 'Company name is required',
      })
      .min(1, 'Company name cannot be empty')
      .trim(),
    industryName: z
      .string({
        required_error: 'Industry name is required',
      })
      .min(1, 'Industry name cannot be empty')
      .trim(),
    companyLocation: z
      .string({
        required_error: 'Company location is required',
      })
      .min(1, 'Company location cannot be empty')
      .trim(),
    stateName: z
      .string({
        required_error: 'State name is required',
      })
      .min(1, 'State name cannot be empty')
      .trim(),
    currency: z.enum(['BDT'], {
      required_error: 'Currency must be BDT',
    }),
    timeZone: z.enum(['GMT+6'], {
      required_error: 'Time zone must be GMT+6',
    }),
    isDeleted: z.boolean().optional(),
  }),
});
const updateOrganizationProfileValidationSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    userId: z.string().optional(),
    companyName: z
      .string({
        required_error: 'Company name is required',
      })
      .min(1, 'Company name cannot be empty')
      .trim()
      .optional(),
    industryName: z
      .string({
        required_error: 'Industry name is required',
      })
      .min(1, 'Industry name cannot be empty')
      .trim()
      .optional(),
    companyLocation: z
      .string({
        required_error: 'Company location is required',
      })
      .min(1, 'Company location cannot be empty')
      .trim()
      .optional(),
    stateName: z
      .string({
        required_error: 'State name is required',
      })
      .min(1, 'State name cannot be empty')
      .trim()
      .optional(),
    currency: z
      .enum(['BDT'], {
        required_error: 'Currency must be BDT',
      })
      .optional(),
    timeZone: z
      .enum(['GMT+6'], {
        required_error: 'Time zone must be GMT+6',
      })
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});
export const OrganizationProfileValidations = {
  createOrganizationProfileValidationSchema,
  updateOrganizationProfileValidationSchema,
};
