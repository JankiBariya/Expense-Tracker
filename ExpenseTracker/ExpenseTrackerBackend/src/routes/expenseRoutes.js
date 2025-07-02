import express from 'express';
import { expenseController } from '../controllers/expenseController.js';
import { validateExpense } from '../middleware/validation.js';

const router = express.Router();

// gettting all expenses
router.get('/', expenseController.getExpenses);

// create a new expense
router.post('/', validateExpense, expenseController.createExpense);

// Update an expense
router.put('/:id', validateExpense, expenseController.updateExpense);

// Delete an expense
router.delete('/:id', expenseController.deleteExpense);

router.get('/stats/top-days', expenseController.getTopDays);

router.get('/stats/monthly-change', expenseController.getMonthlyChange);

router.get('/stats/predictions', expenseController.getPredictedSpending);

export default router; 