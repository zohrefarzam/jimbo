import {FETCH_DOLLAR, FETCH_DOLLAR_ERROR} from '../api/methods/FetchPrices';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function DollarReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DOLLAR_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
    case FETCH_DOLLAR:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.dollar,
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
