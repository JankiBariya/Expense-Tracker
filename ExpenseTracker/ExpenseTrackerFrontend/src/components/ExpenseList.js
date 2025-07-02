import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  updateExpenseRequest,
  updateExpenseSuccess,
  updateExpenseFailure,
  deleteExpenseRequest,
  deleteExpenseSuccess,
  deleteExpenseFailure
} from '../store/slices/expenseSlice';
import { expenseAPI } from '../services/api';

const ExpenseList = ({ onExpenseChanged }) => {
  const dispatch = useDispatch();
  const { expenses, loading, error } = useSelector((state) => state.expenses);
  const { users } = useSelector((state) => state.users);
  const { categories } = useSelector((state) => state.categories);
  
  // Debug logging
  console.log('ExpenseList render:', {
    expenses,
    expensesType: typeof expenses,
    expensesIsArray: Array.isArray(expenses),
    expensesCount: expenses?.length,
    loading,
    error,
    firstExpenseId: expenses?.[0]?.id,
    lastExpenseId: expenses?.[expenses?.length - 1]?.id
  });

  // Ensure expenses is always an array
  const expensesArray = Array.isArray(expenses) ? expenses : [];
  
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    user_id: '',
    category: '',
    amount: '',
    date: '',
    description: '',
  });

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditForm({
      user_id: expense.user_id,
      category: expense.category,
      amount: expense.amount,
      date: expense.date.split('T')[0],
      description: expense.description || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({
      user_id: '',
      category: '',
      amount: '',
      date: '',
      description: '',
    });
  };

  const handleSaveEdit = async () => {
    dispatch(updateExpenseRequest());
    try {
      await expenseAPI.updateExpense(editingId, editForm);
      dispatch(updateExpenseSuccess({ id: editingId, expense: editForm }));
      setEditingId(null);
      
      // Refresh all data including statistics
      if (onExpenseChanged) {
        await onExpenseChanged();
      }
      
      alert('Expense updated successfully!');
    } catch (error) {
      dispatch(updateExpenseFailure(error.message));
      alert('Error updating expense: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      dispatch(deleteExpenseRequest());
      try {
        await expenseAPI.deleteExpense(id);
        dispatch(deleteExpenseSuccess(id));
        
        // Refresh all data including statistics
        if (onExpenseChanged) {
          await onExpenseChanged();
        }
        
        alert('Expense deleted successfully!');
      } catch (error) {
        dispatch(deleteExpenseFailure(error.message));
        alert('Error deleting expense: ' + error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatAmount = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };



  if (loading) {
    return <div className="loading">Loading expenses...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="expense-list">
      <div className="expense-list-header">
        <h2>Expenses ({expensesArray.length})</h2>
      </div>
      {expensesArray.length === 0 ? (
        <p>No expenses found. Add an expense to get started!</p>
      ) : (
        <div>
          <table className="expense-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
                      <tbody>
              {expensesArray.map((expense) => (
              <tr key={expense.id}>
                {editingId === expense.id ? (
                  <>
                    <td>
                      <input
                        type="date"
                        value={editForm.date}
                        onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                      />
                    </td>
                    <td>
                      <select
                        value={editForm.user_id}
                        onChange={(e) => setEditForm({ ...editForm, user_id: e.target.value })}
                      >
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={editForm.category}
                        onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        value={editForm.amount}
                        onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                        step="0.01"
                        min="0.01"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        placeholder="Description"
                      />
                    </td>
                    <td>
                      <div className="expense-actions">
                        <button className="btn btn-primary" onClick={handleSaveEdit}>
                          Save
                        </button>
                        <button className="btn btn-secondary" onClick={handleCancelEdit}>
                          Cancel
                        </button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{formatDate(expense.date)}</td>
                    <td>{expense.user_name}</td>
                    <td>{expense.category_name}</td>
                    <td className="expense-amount">{formatAmount(expense.amount)}</td>
                    <td>{expense.description || '-'}</td>
                    <td>
                      <div className="expense-actions">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(expense)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(expense.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
};

export default ExpenseList; 