import {
  FETCH_PRICES_BEGIN,
  FETCH_PRICES_SUCCESS,
  FETCH_PRICES_FAILURE,
  FETCH_SETTING,
  FETCH_SETTING_ERROR,
} from '../api/methods/FetchPrices';

const initialState = {
  set: [],
  items: [],
  loading: false,
  error: null,
};

export default function pricesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRICES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_PRICES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.prices,
      };

    case FETCH_PRICES_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
    case FETCH_SETTING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        set: [],
      };
    case FETCH_SETTING:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        set: action.payload.setting,
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
