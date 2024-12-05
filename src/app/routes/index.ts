import { Router } from 'express';
import { OrganizationProfileRoutes } from '../modules/organizationProfile/organizationProfile.route';
import { UserRoutes } from '../modules/user/user.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/profiles',
    route: OrganizationProfileRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
