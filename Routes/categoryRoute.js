import express from 'express';
const router = express.Router();

import {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
} from '../Controllers/categoryController.js';

import { authorization, authorizeRoles } from '../Middlewares/authorization.js';


router.route('/').get(getAllCategories).post(authorization, authorizeRoles('ADMIN'), createCategory);
router
    .route('/:id')
    .get(getCategoryById)
    .patch(authorization, authorizeRoles('ADMIN'), updateCategory)
    .delete(authorization, authorizeRoles('ADMIN'), deleteCategory);


export default router;
