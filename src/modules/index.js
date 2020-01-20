import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ui from './ui.reducer';
import search from './search.reducer';
import auth from './auth.reducer';
import items from './items.reducer';
import users from './users.reducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  ui,
  search,
  auth,
  items,
  users,
});