import socketIOClient from "socket.io-client";

import { API } from 'src/constants';

export const UPDATE_GAME = 'UPDATE_GAME';
export const UPDATE_VIEW = 'UPDATE_VIEW';
export const UPDATE_VIEWPORT = 'UPDATE_VIEWPORT';

export const updateGame = game => {
  socketIOClient(API).emit('ToAPI', game);

  return {
    type: UPDATE_GAME,
    game,
  };
}

export const updateView = view => ({
  type: UPDATE_VIEW,
  view,
});

export const updateViewport = (width, height) => ({
  type: UPDATE_VIEWPORT,
  viewport: { width, height },
});