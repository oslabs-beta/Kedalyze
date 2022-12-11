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

const initialState = {
  cluster: {},
  namespace: [] as any,
  podName: [] as any,
  podCapacity: 0,
  podCount: 0,
  terminatedPods: 0,
};

const store = configureStore({
  reducer: {
    cluster: (state = initialState.cluster, action) => {
      switch (action.type) {
        case 'SET_CLUSTER':
          return {
            ...state,
            cluster: action.cluster,
          };
        default:
          return state;
      }
    },
    namespace: (state = initialState.namespace, action) => {
      switch (action.type) {
        case 'SET_NAMESPACE':
          return {
            ...state,
            namespace: action.namespace,
          };
        default:
          return state;
      }
    },
    podName: (state = initialState.podName, action) => {
      switch (action.type) {
        case 'SET_POD_NAME':
          return {
            ...state,
            podName: action.podName,
          };
        default:
          return state;
      }
    },
    podCapacity: (state = initialState.podCapacity, action) => {
      switch (action.type) {
        case 'SET_POD_CAPACITY':
          return {
            ...state,
            podCapacity: action.podCapacity,
          };
        default:
          return state;
      }
    },
    podCount: (state = initialState.podCount, action) => {
      switch (action.type) {
        case 'SET_POD_COUNT':
          return {
            ...state,
            podCount: action.podCount,
          };
        default:
          return state;
      }
    },
    terminatedPods: (state = initialState.terminatedPods, action) => {
      switch (action.type) {
        case 'SET_TERMINATED_PODS':
          return {
            ...state,
            terminatedPods: action.terminatedPods,
          };
        default:
          return state;
      }
    },
  },
});

export default store;
