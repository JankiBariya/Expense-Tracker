import pool from '../config/database.js';

export const expenseModel = {
  async create(expense) {
    const [result] = await pool.execute(
      'INSERT INTO expenses (user_id, category, amount, date, description) VALUES (?, ?, ?, ?, ?)',
      [expense.user_id, expense.category, expense.amount, expense.date, expense.description]
    );
    return result.insertId;
  },

  async findAll(filters = {}) {
    try {
      let whereClause = 'WHERE 1=1';
      const queryParams = [];

      if (filters.user_id) {
        whereClause += ' AND e.user_id = ?';
        queryParams.push(parseInt(filters.user_id));
      }
      if (filters.category) {
        whereClause += ' AND e.category = ?';
        queryParams.push(parseInt(filters.category));
      }
      if (filters.start_date) {
        whereClause += ' AND e.date >= ?';
        queryParams.push(filters.start_date);
      }
      if (filters.end_date) {
        whereClause += ' AND e.date <= ?';
        queryParams.push(filters.end_date);
      }

      const mainQuery = 'SELECT e.*, u.name as user_name, c.name as category_name FROM expenses e JOIN users u ON e.user_id = u.id JOIN categories c ON e.category = c.id ' + whereClause + ' ORDER BY e.date DESC';
      
      console.log('Main Query:', mainQuery, 'Params:', queryParams);
      const [rows] = await pool.execute(mainQuery, queryParams);
      
      return rows;
    } catch (error) {
      console.error('findAll error:', error);
      throw error;
    }
  },

  async update(id, expense) {
    const [result] = await pool.execute(
      'UPDATE expenses SET user_id = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?',
      [expense.user_id, expense.category, expense.amount, expense.date, expense.description, id]
    );
    return result.affectedRows > 0;
  },

  async delete(id) {
    const [result] = await pool.execute('DELETE FROM expenses WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },

  async getTopDaysByUser(filters = {}) {
    let query = `
      SELECT 
        u.id as user_id,
        u.name as user_name,
        e.date,
        SUM(e.amount) as total_amount
      FROM expenses e
      JOIN users u ON e.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (filters.user_id) {
      query += ' AND e.user_id = ?';
      params.push(filters.user_id);
    }
    if (filters.category) {
      query += ' AND e.category = ?';
      params.push(filters.category);
    }
    if (filters.start_date) {
      query += ' AND e.date >= ?';
      params.push(filters.start_date);
    }
    if (filters.end_date) {
      query += ' AND e.date <= ?';
      params.push(filters.end_date);
    }

    query += ' GROUP BY u.id, u.name, e.date ORDER BY u.id, total_amount DESC';
    
    const [rows] = await pool.execute(query, params);

    const userDays = {};
    rows.forEach(row => {
      if (!userDays[row.user_id]) {
        userDays[row.user_id] = {
          user_id: row.user_id,
          user_name: row.user_name,
          top_days: []
        };
      }
      if (userDays[row.user_id].top_days.length < 3) {
        userDays[row.user_id].top_days.push({
          date: row.date,
          total_amount: parseFloat(row.total_amount)
        });
      }
    });

    return Object.values(userDays);
  },

  async getMonthlyChangeByUser(filters = {}) {
    let query = `
      SELECT 
        u.id as user_id,
        u.name as user_name,
        YEAR(e.date) as year,
        MONTH(e.date) as month,
        SUM(e.amount) as total_amount
      FROM expenses e
      JOIN users u ON e.user_id = u.id
      WHERE e.date >= '2024-01-01'
    `;
    const params = [];

    if (filters.user_id) {
      query += ' AND e.user_id = ?';
      params.push(filters.user_id);
    }
    if (filters.category) {
      query += ' AND e.category = ?';
      params.push(filters.category);
    }
    if (filters.start_date) {
      query += ' AND e.date >= ?';
      params.push(filters.start_date);
    }
    if (filters.end_date) {
      query += ' AND e.date <= ?';
      params.push(filters.end_date);
    }

    query += ' GROUP BY u.id, u.name, YEAR(e.date), MONTH(e.date) ORDER BY u.id, year, month';
    
    const [rows] = await pool.execute(query, params);

    const userMonthly = {};
    rows.forEach(row => {
      if (!userMonthly[row.user_id]) {
        userMonthly[row.user_id] = {
          user_id: row.user_id,
          user_name: row.user_name,
          months: []
        };
      }
      userMonthly[row.user_id].months.push({
        year: row.year,
        month: row.month,
        total_amount: parseFloat(row.total_amount)
      });
    });

    return Object.values(userMonthly).map(user => {
      const months = user.months;
      if (months.length >= 2) {
        const current = months[months.length - 1].total_amount;
        const previous = months[months.length - 2].total_amount;
        const change = previous ? ((current - previous) / previous) * 100 : 0;
        return {
          ...user,
          percentage_change: Math.round(change * 100) / 100,
          current_month: current,
          previous_month: previous
        };
      }
      return { ...user, percentage_change: 0, current_month: 0, previous_month: 0 };
    });
  },

  async getPredictedSpending(filters = {}) {
    let query = `
      SELECT 
        u.id as user_id,
        u.name as user_name,
        YEAR(e.date) as year,
        MONTH(e.date) as month,
        SUM(e.amount) as total_amount
      FROM expenses e
      JOIN users u ON e.user_id = u.id
      WHERE e.date >= '2024-01-01'
    `;
    const params = [];

    if (filters.user_id) {
      query += ' AND e.user_id = ?';
      params.push(filters.user_id);
    }
    if (filters.category) {
      query += ' AND e.category = ?';
      params.push(filters.category);
    }
    if (filters.start_date) {
      query += ' AND e.date >= ?';
      params.push(filters.start_date);
    }
    if (filters.end_date) {
      query += ' AND e.date <= ?';
      params.push(filters.end_date);
    }

    query += ' GROUP BY u.id, u.name, YEAR(e.date), MONTH(e.date) ORDER BY u.id, year, month';
    
    const [rows] = await pool.execute(query, params);

    const userMonthly = {};
    rows.forEach(row => {
      if (!userMonthly[row.user_id]) {
        userMonthly[row.user_id] = {
          user_id: row.user_id,
          user_name: row.user_name,
          months: []
        };
      }
      userMonthly[row.user_id].months.push({
        year: row.year,
        month: row.month,
        amount: parseFloat(row.total_amount)
      });
    });

    return Object.values(userMonthly).map(user => {
      const monthlyData = user.months;
      const amounts = monthlyData.map(m => m.amount);
      const average = amounts.length > 0 ? amounts.reduce((sum, amt) => sum + amt, 0) / amounts.length : 0;
      
      return {
        user_id: user.user_id,
        user_name: user.user_name,
        predicted_amount: Math.round(average * 100) / 100,
        months_analyzed: amounts.length,
        historical_data: monthlyData
      };
    });
  }
}; 