import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ui from './ui.reducer';
import bucket from './bucket.reducer';
import search from './search.reducer';
import auth from './auth.reducer';
import items from './items.reducer';
import users from './user.reducer';
import comments from './comments.reducer';
import recommendation from './recommendation.reducer';
import projects from './projects.reducer';
import cart from './cart.reducer';
import notification from './notification.reducer';
import editor from './editor.reducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  ui,
  bucket,
  search,
  auth,
  items,
  users,
  comments,
  recommendation,
  projects,
  cart,
  notification,
  editor,
});