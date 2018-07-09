// Creates a basic action
export const createAction = (type, actionProps = {}) => {
  return {
    type,
    ...actionProps
  };
}

// Create a basic Reducer
export const createReducer = (initialState = {}, actionHandlerKeyFuncs = {}) => {
  return (state = initialState, action) => {
    const actionHandler = actionHandlerKeyFuncs[action.type];
    return actionHandler ? actionHandler(state, action) : state;
  }
};

// Create an asynchrounous action
export const createAsyncAction = (actionType, asyncRequestFn, actionStartProps = {}) => {
  return (dispatch) => {
    dispatch(createAction(`${actionType}_START`, actionStartProps));
    return asyncRequestFn().then(response => {
      response.json().then(data => {
        dispatch(createAction(`${actionType}_SUCCESS`, { response: data }));
        return { data };
      });
    }).catch(error => {
      dispatch(createAction(`${actionType}_ERROR`, { error: {
          ...error,
        }}));
      return Promise.reject({ ...error })
    });
  }
}

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

export const isSuccess = (prevReq, currReq) => {
  const prevReqSafe = prevReq || {};
  const currReqSafe = currReq || {};
  if (prevReqSafe.isLoading && !currReqSafe.isLoading && currReqSafe.response) {
    return true;
  }
  return false;
}

export const isFailure = (prevReq, currReq) => {
  const prevReqSafe = prevReq || {};
  const currReqSafe = currReq || {};
  if (prevReqSafe.isLoading && !currReqSafe.isLoading && currReqSafe.error) {
    return true;
  }
  return false;
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