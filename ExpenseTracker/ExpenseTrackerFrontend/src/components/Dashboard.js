import React, { useEffect, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchUsersRequest, 
  fetchUsersSuccess, 
  fetchUsersFailure 
} from '../store/slices/userSlice';
import { 
  fetchCategoriesRequest, 
  fetchCategoriesSuccess, 
  fetchCategoriesFailure 
} from '../store/slices/categorySlice';
import { 
  fetchExpensesRequest, 
  fetchExpensesSuccess, 
  fetchExpensesFailure 
} from '../store/slices/expenseSlice';
import { 
  fetchTopDaysRequest, 
  fetchTopDaysSuccess, 
  fetchTopDaysFailure,
  fetchMonthlyChangeRequest,
  fetchMonthlyChangeSuccess,
  fetchMonthlyChangeFailure,
  fetchPredictionsRequest,
  fetchPredictionsSuccess,
  fetchPredictionsFailure
} from '../store/slices/statisticsSlice';
import { userAPI, categoryAPI, expenseAPI } from '../services/api';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import ExpenseFilters from './ExpenseFilters';
import Statistics from './Statistics';

const Dashboard = () => {
  const dispatch = useDispatch();
  const intervalRef = useRef(null);
  const isPollingActive = useRef(true);
  
  // Get current filters state from Redux
  const { filters } = useSelector(state => state.expenses);

  // Fetch users
  const fetchUsers = async () => {
    dispatch(fetchUsersRequest());
    try {
      const response = await userAPI.getUsers();
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    dispatch(fetchCategoriesRequest());
    try {
      const response = await categoryAPI.getCategories();
      dispatch(fetchCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error.message));
    }
  };

  // Fetch expenses with filters and pagination
  const fetchExpenses = async (filters = {}) => {
    console.log('📡 fetchExpenses called with filters:', filters);
    dispatch(fetchExpensesRequest());
    try {
      const response = await expenseAPI.getExpenses(filters);
      console.log('📡 fetchExpenses response:', response.data);
      dispatch(fetchExpensesSuccess(response.data));
    } catch (error) {
      console.error('📡 fetchExpenses error:', error);
      dispatch(fetchExpensesFailure(error.message));
    }
  };

  // Fetch top days
  const fetchTopDays = async (statsFilters = {}) => {
    dispatch(fetchTopDaysRequest());
    try {
      console.log('fetchTopDays called with filters:', statsFilters);
      const response = await expenseAPI.getTopDays(statsFilters);
      console.log('fetchTopDays response:', response.data);
      dispatch(fetchTopDaysSuccess(response.data));
    } catch (error) {
      dispatch(fetchTopDaysFailure(error.message));
    }
  };

  // Fetch monthly change
  const fetchMonthlyChange = async (statsFilters = {}) => {
    dispatch(fetchMonthlyChangeRequest());
    try {
      console.log('fetchMonthlyChange called with filters:', statsFilters);
      const response = await expenseAPI.getMonthlyChange(statsFilters);
      console.log('fetchMonthlyChange response:', response.data);
      dispatch(fetchMonthlyChangeSuccess(response.data));
    } catch (error) {
      dispatch(fetchMonthlyChangeFailure(error.message));
    }
  };

  // Fetch predictions
  const fetchPredictions = async (statsFilters = {}) => {
    dispatch(fetchPredictionsRequest());
    try {
      console.log('fetchPredictions called with filters:', statsFilters);
      const response = await expenseAPI.getPredictions(statsFilters);
      console.log('fetchPredictions response:', response.data);
      dispatch(fetchPredictionsSuccess(response.data));
    } catch (error) {
      dispatch(fetchPredictionsFailure(error.message));
    }
  };

  // Fetch all data - centralized function
  const fetchAllData = useCallback(async () => {
    console.log('🔄 Fetching all data...');
    
    console.log('🔄 Using filters:', filters);
    
    await Promise.all([
      fetchUsers(),
      fetchCategories(),
      fetchExpenses(filters),
      fetchTopDays(filters),
      fetchMonthlyChange(filters),
      fetchPredictions(filters)
    ]);
    console.log('✅ All data fetched successfully');
  }, [filters, dispatch]);

  useEffect(() => {
    // Initial data fetch
    fetchAllData();

    // Set up polling every 30 seconds for real-time updates
    intervalRef.current = setInterval(() => {
      if (isPollingActive.current) {
        console.log('🔄 Polling: Refreshing data...');
        fetchAllData();
      }
    }, 30000); // 30 seconds

    // Handle window focus - refresh data when user returns to tab
    const handleWindowFocus = () => {
      console.log('👁️ Window focused: Refreshing data...');
      fetchAllData();
    };

    // Handle visibility change - pause polling when tab is not visible
    const handleVisibilityChange = () => {
      if (document.hidden) {
        console.log('⏸️ Tab hidden: Pausing polling');
        isPollingActive.current = false;
      } else {
        console.log('▶️ Tab visible: Resuming polling and refreshing data');
        isPollingActive.current = true;
        fetchAllData();
      }
    };

    // Add event listeners
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dispatch, fetchAllData]);

  const handleManualRefresh = () => {
    console.log('🔄 Manual refresh triggered');
    fetchAllData();
  };

  const handleFiltersChange = () => {
    console.log('🔍 Filters changed, refreshing data');
    fetchAllData();
  };

  return (
    <div className="dashboard">
      {/* Top row with all 3 cards in flex layout */}
      <div className="dashboard-top-cards">
        <div className="dashboard-section add-expense-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2>Add Expense</h2>
            <button 
              className="btn btn-refresh" 
              onClick={handleManualRefresh}
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              Refresh
            </button>
          </div>
          <ExpenseForm onExpenseAdded={fetchAllData} />
        </div>
        
        <div className="dashboard-section filters-card">
          <h2>Filters</h2>
          <ExpenseFilters onFiltersChange={handleFiltersChange} />
        </div>
        
        <div className="dashboard-section statistics-card">
          <h2>Statistics</h2>
          <div className="statistics-compact">
            <Statistics />
          </div>
        </div>
      </div>
      
      {/* Expense list takes full width below */}
      <div className="expense-list-container">
        <ExpenseList onExpenseChanged={fetchAllData} />
      </div>
    </div>
  );
};

export default Dashboard; 