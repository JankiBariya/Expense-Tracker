import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setFilters, 
  clearFilters
} from '../store/slices/expenseSlice';

const ExpenseFilters = ({ onFiltersChange }) => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.expenses);
  const { users } = useSelector((state) => state.users);
  const { categories } = useSelector((state) => state.categories);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilters({ [name]: value }));
  };

  const handleApplyFilters = () => {
    console.log('🔍 Applying filters:', filters);
    if (onFiltersChange) {
      onFiltersChange();
    }
  };

  const handleClearFilters = () => {
    console.log('🔍 Clearing filters');
    dispatch(clearFilters());
    // Reset to page 1 when filters are cleared (handled by Redux)
    if (onFiltersChange) {
      onFiltersChange();
    }
  };

  return (
    <div className="filters-container">
      <div className="filters">
        <div className="form-group">
          <label>User</label>
          <select
            name="user_id"
            value={filters.user_id}
            onChange={handleFilterChange}
          >
            <option value="">All Users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Start Date</label>
          <input
            type="date"
            name="start_date"
            value={filters.start_date}
            onChange={handleFilterChange}
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="end_date"
            value={filters.end_date}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className="filter-buttons">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleApplyFilters}
        >
          Apply Filters
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default ExpenseFilters; 