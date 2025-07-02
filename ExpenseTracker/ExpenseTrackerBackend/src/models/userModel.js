import pool from '../config/database.js';

export const userModel = {
  async findAll() {
    const [rows] = await pool.execute('SELECT * FROM users WHERE status = "active"');
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }
}; 