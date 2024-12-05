import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidations } from '../user/user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post(
  '/create-user',
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.createUser,
);
router.get('/', UserControllers.getUsers);
router.get('/:id', UserControllers.getSingleUser);
router.patch('/:id', UserControllers.updateUser);
router.delete('/:id', UserControllers.deleteUser);
export const UserRoutes = router;
