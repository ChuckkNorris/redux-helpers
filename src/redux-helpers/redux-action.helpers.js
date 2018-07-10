// Creates a basic action
export const createAction = (type, actionProps = {}) => {
  if (actionProps )
  return {
    type,
    ...actionProps
  };
}

// Create an asynchrounous action to dispatch fetch requests
export const createAsyncFetchAction = (actionType, asyncRequestFn, actionStartProps = {}) => {
  asyncActionBuilder({actionType, asyncRequestFn, actionStartProps, dispatchFetchSuccess})
}

// Create an asynchrounous action to dispatch axios requests
export const createAsyncAxiosAction = (actionType, asyncRequestFn, actionStartProps = {}) => {
  asyncActionBuilder({actionType, asyncRequestFn, actionStartProps, dispatchAxiosSuccess})
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

const asyncActionBuilder = ({
  actionType,
  asyncRequestFn,
  actionStartProps = {},
  onSuccessResponseHandler
}) => {
  return (dispatch) => {
    dispatch(createAction(`${actionType}_START`, actionStartProps));
    return asyncRequestFn().then(response => {
      onSuccessResponseHandler(response, dispatch)
    }).catch(error => {
      dispatch(createAction(`${actionType}_ERROR`, { error: {
          ...error,
        }}));
    });
  }
}

const dispatchFetchSuccess = (response, dispatch) => {
  response.json().then(data => {
    dispatch(createAction(`${actionType}_SUCCESS`, { response: data }));
  });
}

const dispatchAxiosSuccess = (response, dispatch) => {
  dispatch(createAction(`${actionType}_SUCCESS`, { response: data }));
}
