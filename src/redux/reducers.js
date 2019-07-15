import { combineReducers } from 'redux';

export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT';

const initStates = {
  viewport: { width: 0, height: 0 },
}

const app = (state = initStates, action) => {
  switch (action.type) {

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
