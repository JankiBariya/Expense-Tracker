import React from 'react';
import { useSelector } from 'react-redux';

const Statistics = () => {
  const { topDays, monthlyChange, predictions, loading, error } = useSelector((state) => state.statistics);
  const { filters } = useSelector((state) => state.expenses);
  
  console.log('Statistics component render:', { 
    topDaysCount: topDays.length, 
    monthlyChangeCount: monthlyChange.length, 
    predictionsCount: predictions.length,
    currentFilters: filters
  });

  const formatAmount = (amount) => {
    return `₹${parseFloat(amount).toFixed(2)}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatPercentage = (percentage) => {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(1)}%`;
  };

  if (loading) {
    return <div className="loading">Loading statistics...</div>;
  }

  if (error) {
    return <div className="error">Error loading statistics: {error}</div>;
  }

  return (
    <div className="statistics">
      
      {loading && (
        <div style={{ 
          background: '#fff3e0', 
          padding: '0.75rem', 
          borderRadius: '8px', 
          marginBottom: '1rem',
          border: '1px solid #ff9800',
          color: '#f57c00'
        }}>
          <strong>⏳ Updating statistics...</strong>
        </div>
      )}
      <div className="stat-card">
        <h3>Top Spending Days</h3>
        {topDays.length === 0 ? (
          <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: 0 }}>No data available</p>
        ) : (
          topDays.slice(0, 2).map((user) => (
            <div key={user.user_id} style={{ marginBottom: '1rem' }}>
              <h4>{user.user_name}</h4>
              {user.top_days.slice(0, 2).map((day, index) => (
                <div key={index} className="stat-item">
                  <span>#{index + 1} - {formatDate(day.date)}</span>
                  <span className="stat-value">{formatAmount(day.total_amount)}</span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>

      <div className="stat-card">
        <h3>Monthly Change</h3>
        {monthlyChange.length === 0 ? (
          <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: 0 }}>No data available</p>
        ) : (
          monthlyChange.slice(0, 3).map((user) => (
            <div key={user.user_id} className="stat-item">
              <span>{user.user_name}</span>
              <span 
                className="stat-value"
                style={{ 
                  color: user.percentage_change >= 0 ? '#dc2626' : '#16a34a' 
                }}
              >
                {formatPercentage(user.percentage_change)}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="stat-card">
        <h3>Next Month Predictions</h3>
        {predictions.length === 0 ? (
          <p style={{ color: '#6b7280', fontSize: '0.75rem', margin: 0 }}>No data available</p>
        ) : (
          predictions.slice(0, 3).map((user) => (
            <div key={user.user_id} style={{ marginBottom: '0.5rem' }}>
              <div className="stat-item">
                <span>{user.user_name}</span>
                <span className="stat-value">{formatAmount(user.predicted_amount)}</span>
              </div>
              {user.months_analyzed > 0 && (
                <small style={{ color: '#6b7280', fontSize: '0.7rem', marginLeft: '0.5rem' }}>
                  {user.months_analyzed}m data
                </small>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Statistics; 