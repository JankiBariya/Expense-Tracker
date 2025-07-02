import { body } from 'express-validator';

export const validateExpense = [
  body('user_id').isInt().withMessage('User ID must be an integer'),
  body('category').isInt().withMessage('Category must be an integer'),
  body('amount').isFloat({ min: 0.01 }).withMessage('Amount must be a positive number'),
  body('date').isISO8601().withMessage('Date must be in valid format'),
  body('description').optional().isString().trim()
]; 