import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

const initialState = {
  TotalCount: 0,
  weblog: [],
  subjects: [],
};

// TODO: Test!
export const learning = createReducer(initialState, {
  [types.ALL_WEBLOG_REQUEST](state, actions) {
    return {...state, learning: []};
  },
});
