import { expenseModel } from '../models/expenseModel.js';
import { validationResult } from 'express-validator';

export const expenseController = {
  async createExpense(req, res) {
    try {

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const expenseId = await expenseModel.create(req.body);

      res.status(201).json({ id: expenseId, message: 'Expense created successfully' });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getExpenses(req, res) {
    try {

      const { user_id, category, start_date, end_date } = req.query;

      const filters = {};
      
      if (user_id) filters.user_id = user_id;
      if (category) filters.category = category;
      if (start_date) filters.start_date = start_date;
      if (end_date) filters.end_date = end_date;


      const expenses = await expenseModel.findAll(filters);
      res.json(expenses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async updateExpense(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const updated = await expenseModel.update(req.params.id, req.body);
      if (updated) {
        res.json({ message: 'Expense updated successfully' });
      } else {
        res.status(404).json({ error: 'Expense not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async deleteExpense(req, res) {
    try {
      const deleted = await expenseModel.delete(req.params.id);
      if (deleted) {
        res.json({ message: 'Expense deleted successfully' });
      } else {
        res.status(404).json({ error: 'Expense not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getTopDays(req, res) {
    try {
      const { user_id, category, start_date, end_date } = req.query;
      const filters = {};
      
      if (user_id) filters.user_id = user_id;
      if (category) filters.category = category;
      if (start_date) filters.start_date = start_date;
      if (end_date) filters.end_date = end_date;

      const topDays = await expenseModel.getTopDaysByUser(filters);
      res.json(topDays);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getMonthlyChange(req, res) {
    try {
      const { user_id, category, start_date, end_date } = req.query;
      const filters = {};
      
      if (user_id) filters.user_id = user_id;
      if (category) filters.category = category;
      if (start_date) filters.start_date = start_date;
      if (end_date) filters.end_date = end_date;

      const monthlyChange = await expenseModel.getMonthlyChangeByUser(filters);
      res.json(monthlyChange);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getPredictedSpending(req, res) {
    try {
      const { user_id, category, start_date, end_date } = req.query;
      const filters = {};
      
      if (user_id) filters.user_id = user_id;
      if (category) filters.category = category;
      if (start_date) filters.start_date = start_date;
      if (end_date) filters.end_date = end_date;

      const predictions = await expenseModel.getPredictedSpending(filters);
      res.json(predictions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}; 