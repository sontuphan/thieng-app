import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import search from './search.reducer';
import auth from './auth.reducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  search,
  auth,
});