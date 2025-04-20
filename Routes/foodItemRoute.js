import express from 'express';
import {
    createFoodItem,
    getAllFoodItems,
    getFoodItemById,
    updateFoodItem,
    deleteFoodItem,
} from '../Controllers/foodItemController.js';
import { authorization, authorizeRoles } from '../Middlewares/authorization.js';


const router = express.Router();

router.route('/').get(getAllFoodItems).post(authorization, authorizeRoles('ADMIN'), createFoodItem);
router
    .route('/:id')
    .get(getFoodItemById)
    .patch(authorization, authorizeRoles('ADMIN'), updateFoodItem)
    .delete(authorization, authorizeRoles('ADMIN'), deleteFoodItem);

export default router;
