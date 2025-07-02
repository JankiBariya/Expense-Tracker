export const FETCH_TOP_DAYS_REQUEST = 'FETCH_TOP_DAYS_REQUEST';
export const FETCH_TOP_DAYS_SUCCESS = 'FETCH_TOP_DAYS_SUCCESS';
export const FETCH_TOP_DAYS_FAILURE = 'FETCH_TOP_DAYS_FAILURE';
export const FETCH_MONTHLY_CHANGE_REQUEST = 'FETCH_MONTHLY_CHANGE_REQUEST';
export const FETCH_MONTHLY_CHANGE_SUCCESS = 'FETCH_MONTHLY_CHANGE_SUCCESS';
export const FETCH_MONTHLY_CHANGE_FAILURE = 'FETCH_MONTHLY_CHANGE_FAILURE';
export const FETCH_PREDICTIONS_REQUEST = 'FETCH_PREDICTIONS_REQUEST';
export const FETCH_PREDICTIONS_SUCCESS = 'FETCH_PREDICTIONS_SUCCESS';
export const FETCH_PREDICTIONS_FAILURE = 'FETCH_PREDICTIONS_FAILURE';

export const fetchTopDaysRequest = () => ({ type: FETCH_TOP_DAYS_REQUEST });
export const fetchTopDaysSuccess = (topDays) => ({ type: FETCH_TOP_DAYS_SUCCESS, payload: topDays });
export const fetchTopDaysFailure = (error) => ({ type: FETCH_TOP_DAYS_FAILURE, payload: error });

export const fetchMonthlyChangeRequest = () => ({ type: FETCH_MONTHLY_CHANGE_REQUEST });
export const fetchMonthlyChangeSuccess = (monthlyChange) => ({ type: FETCH_MONTHLY_CHANGE_SUCCESS, payload: monthlyChange });
export const fetchMonthlyChangeFailure = (error) => ({ type: FETCH_MONTHLY_CHANGE_FAILURE, payload: error });

export const fetchPredictionsRequest = () => ({ type: FETCH_PREDICTIONS_REQUEST });
export const fetchPredictionsSuccess = (predictions) => ({ type: FETCH_PREDICTIONS_SUCCESS, payload: predictions });
export const fetchPredictionsFailure = (error) => ({ type: FETCH_PREDICTIONS_FAILURE, payload: error });

const initialState = {
  topDays: [],
  monthlyChange: [],
  predictions: [],
  loading: false,
  error: null,
};

const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TOP_DAYS_REQUEST:
    case FETCH_MONTHLY_CHANGE_REQUEST:
    case FETCH_PREDICTIONS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TOP_DAYS_SUCCESS:
      console.log('Redux state updated - topDays:', action.payload);
      return {
        ...state,
        loading: false,
        topDays: action.payload,
        error: null,
      };
    case FETCH_MONTHLY_CHANGE_SUCCESS:
      console.log('Redux state updated - monthlyChange:', action.payload);
      return {
        ...state,
        loading: false,
        monthlyChange: action.payload,
        error: null,
      };
    case FETCH_PREDICTIONS_SUCCESS:
      console.log('Redux state updated - predictions:', action.payload);
      return {
        ...state,
        loading: false,
        predictions: action.payload,
        error: null,
      };
    case FETCH_TOP_DAYS_FAILURE:
    case FETCH_MONTHLY_CHANGE_FAILURE:
    case FETCH_PREDICTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default statisticsReducer; 