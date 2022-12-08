import {
  Action,
  ThunkAction,
  configureStore,
  createSlice,
} from '@reduxjs/toolkit';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const reducerSlice = createSlice({
  name: 'store',
  initialState: {},
  reducers: {
    someAction: function () {},
  },
});

const store = configureStore({
  reducer: {
    someReducer: reducerSlice.reducer,
  },
});

export default store;
