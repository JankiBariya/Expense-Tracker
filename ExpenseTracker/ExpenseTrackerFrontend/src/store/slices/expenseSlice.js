export const FETCH_EXPENSES_REQUEST = 'FETCH_EXPENSES_REQUEST';
export const FETCH_EXPENSES_SUCCESS = 'FETCH_EXPENSES_SUCCESS';
export const FETCH_EXPENSES_FAILURE = 'FETCH_EXPENSES_FAILURE';
export const CREATE_EXPENSE_REQUEST = 'CREATE_EXPENSE_REQUEST';
export const CREATE_EXPENSE_SUCCESS = 'CREATE_EXPENSE_SUCCESS';
export const CREATE_EXPENSE_FAILURE = 'CREATE_EXPENSE_FAILURE';
export const UPDATE_EXPENSE_REQUEST = 'UPDATE_EXPENSE_REQUEST';
export const UPDATE_EXPENSE_SUCCESS = 'UPDATE_EXPENSE_SUCCESS';
export const UPDATE_EXPENSE_FAILURE = 'UPDATE_EXPENSE_FAILURE';
export const DELETE_EXPENSE_REQUEST = 'DELETE_EXPENSE_REQUEST';
export const DELETE_EXPENSE_SUCCESS = 'DELETE_EXPENSE_SUCCESS';
export const DELETE_EXPENSE_FAILURE = 'DELETE_EXPENSE_FAILURE';
export const SET_FILTERS = 'SET_FILTERS';
export const CLEAR_FILTERS = 'CLEAR_FILTERS';

export const fetchExpensesRequest = () => ({ type: FETCH_EXPENSES_REQUEST });
export const fetchExpensesSuccess = (expenses) => ({ type: FETCH_EXPENSES_SUCCESS, payload: expenses });
export const fetchExpensesFailure = (error) => ({ type: FETCH_EXPENSES_FAILURE, payload: error });

export const createExpenseRequest = () => ({ type: CREATE_EXPENSE_REQUEST });
export const createExpenseSuccess = (expense) => ({ type: CREATE_EXPENSE_SUCCESS, payload: expense });
export const createExpenseFailure = (error) => ({ type: CREATE_EXPENSE_FAILURE, payload: error });

export const updateExpenseRequest = () => ({ type: UPDATE_EXPENSE_REQUEST });
export const updateExpenseSuccess = (expense) => ({ type: UPDATE_EXPENSE_SUCCESS, payload: expense });
export const updateExpenseFailure = (error) => ({ type: UPDATE_EXPENSE_FAILURE, payload: error });

export const deleteExpenseRequest = () => ({ type: DELETE_EXPENSE_REQUEST });
export const deleteExpenseSuccess = (id) => ({ type: DELETE_EXPENSE_SUCCESS, payload: id });
export const deleteExpenseFailure = (error) => ({ type: DELETE_EXPENSE_FAILURE, payload: error });

export const setFilters = (filters) => ({ type: SET_FILTERS, payload: filters });
export const clearFilters = () => ({ type: CLEAR_FILTERS });

const initialState = {
  expenses: [],
  loading: false,
  error: null,
  filters: {
    user_id: '',
    category: '',
    start_date: '',
    end_date: '',
  },
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EXPENSES_REQUEST:
    case CREATE_EXPENSE_REQUEST:
    case UPDATE_EXPENSE_REQUEST:
    case DELETE_EXPENSE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_EXPENSES_SUCCESS:
      console.log('🔄 Redux FETCH_EXPENSES_SUCCESS:', {
        payload: action.payload,
        payloadType: typeof action.payload,
        payloadIsArray: Array.isArray(action.payload),
        newExpenses: action.payload?.length
      });
      const expenses = Array.isArray(action.payload) ? action.payload : [];
      return {
        ...state,
        loading: false,
        expenses: expenses,
        error: null,
      };
    case CREATE_EXPENSE_SUCCESS:
    case UPDATE_EXPENSE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case DELETE_EXPENSE_SUCCESS:
      const currentExpenses = Array.isArray(state.expenses) ? state.expenses : [];
      return {
        ...state,
        loading: false,
        expenses: currentExpenses.filter(expense => expense.id !== action.payload),
        error: null,
      };
    case FETCH_EXPENSES_FAILURE:
    case CREATE_EXPENSE_FAILURE:
    case UPDATE_EXPENSE_FAILURE:
    case DELETE_EXPENSE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          user_id: '',
          category: '',
          start_date: '',
          end_date: '',
        },
      };
    default:
      return state;
  }
};

export default expenseReducer; 