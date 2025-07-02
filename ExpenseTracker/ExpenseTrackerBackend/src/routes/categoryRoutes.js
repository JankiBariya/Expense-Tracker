import express from 'express';
import { categoryController } from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', categoryController.getCategories);

router.get('/:id', categoryController.getCategoryById);

export default router; 