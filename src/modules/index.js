import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import search from './search.reducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  search,
});