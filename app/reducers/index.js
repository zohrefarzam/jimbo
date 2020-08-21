import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import prices from './PricesReducer';
import setting from './SettingReducer';
import dollar from './DollarReducer';
import user from './userReducer';
export default combineReducers({
  prices,
  setting,
  form: formReducer,
  dollar,
  user,
});
