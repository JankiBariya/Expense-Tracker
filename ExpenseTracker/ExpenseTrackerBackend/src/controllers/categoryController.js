import { categoryModel } from '../models/categoryModel.js';

export const categoryController = {
  async getCategories(req, res) {
    try {
      const categories = await categoryModel.findAll();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getCategoryById(req, res) {
    try {
      const category = await categoryModel.findById(req.params.id);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: 'Category not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}; 