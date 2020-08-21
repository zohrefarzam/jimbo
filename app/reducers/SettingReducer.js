import {FETCH_SETTING, FETCH_SETTING_ERROR} from '../api/methods/FetchPrices';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function SettingReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SETTING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
    case FETCH_SETTING:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.setting,
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
