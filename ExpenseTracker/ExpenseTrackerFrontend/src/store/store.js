import { createStore, combineReducers } from 'redux';
import expenseReducer from './slices/expenseSlice';
import userReducer from './slices/userSlice';
import categoryReducer from './slices/categorySlice';
import statisticsReducer from './slices/statisticsSlice';

const rootReducer = combineReducers({
  expenses: expenseReducer,
  users: userReducer,
  categories: categoryReducer,
  statistics: statisticsReducer,
});

export const store = createStore(rootReducer); 