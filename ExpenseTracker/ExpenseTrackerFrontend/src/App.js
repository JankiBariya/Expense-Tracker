import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <h1>Expense Tracker</h1>
        </header>
        <main>
          <Dashboard />
        </main>
      </div>
    </Provider>
  );
}

export default App; 