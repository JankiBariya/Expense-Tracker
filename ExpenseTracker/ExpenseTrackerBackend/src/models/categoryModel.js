import pool from '../config/database.js';

export const categoryModel = {
  async findAll() {
    const [rows] = await pool.execute('SELECT * FROM categories ORDER BY name');
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return rows[0];
  }
}; 