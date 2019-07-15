import { UPDATE_VIEWPORT } from './reducers';

export const updateViewport = (width, height) => ({
  type: UPDATE_VIEWPORT,
  viewport: { width, height },
});