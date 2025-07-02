import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  createExpenseRequest, 
  createExpenseSuccess, 
  createExpenseFailure
} from '../store/slices/expenseSlice';
import { expenseAPI } from '../services/api';

const ExpenseForm = ({ onExpenseAdded }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const { categories } = useSelector((state) => state.categories);
  const { loading } = useSelector((state) => state.expenses);

  const [formData, setFormData] = useState({
    user_id: '',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.user_id || !formData.category || !formData.amount || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }

    dispatch(createExpenseRequest());
    try {
      const response = await expenseAPI.createExpense(formData);
      dispatch(createExpenseSuccess(response.data));
      setFormData({
        user_id: '',
        category: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
      });
      
      // Refresh all data including statistics
      if (onExpenseAdded) {
        await onExpenseAdded();
      }
      
      alert('Expense added successfully!');
    } catch (error) {
      dispatch(createExpenseFailure(error.message));
      alert('Error adding expense: ' + error.message);
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>User *</label>
        <select
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Category *</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Amount *</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          placeholder="0.00"
          required
        />
      </div>

      <div className="form-group">
        <label>Date *</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Optional description"
          rows="3"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  );
};

export default ExpenseForm; 