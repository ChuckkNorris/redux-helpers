// Create a basic Reducer
export const createReducer = (initialState = {}, actionHandlerKeyFuncs = {}) => {
  return (state = initialState, action) => {
    const actionHandler = actionHandlerKeyFuncs[action.type];
    return actionHandler ? actionHandler(state, action) : state;
  }
};

// Create an asynchronous reducer
export const createAsyncReducer = (actionType, actionHandlerKeyFuncs = {}, initialState = initialAsyncState) => {
  return createReducer(
    initialState,
    {
      [`${actionType}_START`]: startReducerFn,
      [`${actionType}_SUCCESS`]: successReducerFn,
      [`${actionType}_ERROR`]: errorReducerFn,
      ...actionHandlerKeyFuncs
    }
  );
}

// Default Async State
const initialAsyncState = { isLoading: false, response: undefined, request: undefined };

// Default async state reducer functions
const startReducerFn =  (state, action) => ({
  ...state,
  isLoading: true,
  error: undefined
});
const successReducerFn = (state, action) => ({
  ...state,
  isLoading: false,
  response: action.response
});
const errorReducerFn =  (state, action) => ({
  ...state,
  isLoading: false,
  error: action.error
});