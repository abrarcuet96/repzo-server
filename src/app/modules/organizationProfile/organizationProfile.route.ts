import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { organizationProfileControllers } from './organizationProfile.controller';
import { OrganizationProfileValidations } from './organizationProfile.validation';

const router = express.Router();

router.post(
  '/:id',
  validateRequest(
    OrganizationProfileValidations.createOrganizationProfileValidationSchema,
  ),
  organizationProfileControllers.createOrganizationProfile,
);
router.get('/', organizationProfileControllers.getOrganizationProfiles);
router.get('/:id', organizationProfileControllers.getSingleOrganizationProfile);
router.patch('/:id', organizationProfileControllers.updateOrganizationProfile);
router.delete('/:id', organizationProfileControllers.deleteOrganizationProfile);
export const OrganizationProfileRoutes = router;
