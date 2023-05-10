// file: store.ts
import { configureStore } from '@reduxjs/toolkit';

import treeReducer from './slice';

const reducer = {
  tree: treeReducer,
};

export const store = configureStore({
  reducer,
});
