import { combineReducers } from 'redux';

import { UPDATE_VIEW, UPDATE_VIEWPORT } from './actions';

const initStates = {
  view: null,
  viewport: { width: 0, height: 0 },
}

const app = (state = initStates, action) => {
  switch (action.type) {

  case UPDATE_VIEW:
    return {
      ...state,
      view: action.view,
    };

  case UPDATE_VIEWPORT:
    return {
      ...state,
      viewport: action.viewport,
    };

  default:
    return state;
  }
}

export const reducers = combineReducers({
  app,
});
