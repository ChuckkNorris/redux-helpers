// - - PRIVATE - - //
const dispatchFetchSuccess = (response, actionType, dispatch, actionStartProps) => {
  return response.json().then(data => {
    dispatch(createAction(`${actionType}_SUCCESS`, { response: data, startParams: actionStartProps }));
  }).catch(error => {
    dispatch(createAction(`${actionType}_ERROR`, error));
  })
}

const dispatchAxiosSuccess = (response, actionType, dispatch, actionStartProps) => {
  return dispatch(createAction(`${actionType}_SUCCESS`, { response: response.data, startParams: actionStartProps }));
}

const asyncActionBuilder = (
  actionType,
  asyncRequestFn,
  actionStartProps,
  onSuccessResponseHandler
) => {
  return (dispatch) => {
    dispatch(createAction(`${actionType}_START`, actionStartProps));
    return asyncRequestFn().then(response => {
      onSuccessResponseHandler(response, actionType, dispatch, actionStartProps)
    }).catch(error => {
      dispatch(createAction(`${actionType}_ERROR`, {error, startParams: actionStartProps}));
    });
  }
}

// - - PUBLIC - - //

// Creates a basic action
export const createAction = (type, actionProps = {}) => {
  return {
    type,
    ...actionProps
  };
}

// Create an asynchrounous action to dispatch fetch requests
export const createAsyncFetchAction = (actionType, asyncRequestFn, actionStartProps = {}) => {
  return asyncActionBuilder(actionType, asyncRequestFn, actionStartProps, dispatchFetchSuccess)
}

// Create an asynchrounous action to dispatch axios requests
export const createAsyncAxiosAction = (actionType, asyncRequestFn, actionStartProps = {}) => {
  return asyncActionBuilder(actionType, asyncRequestFn, actionStartProps, dispatchAxiosSuccess)
}

// Determines if an async request was successful or not
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
