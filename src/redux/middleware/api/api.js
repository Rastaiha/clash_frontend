import * as actionTypes from '../../actions/actionTypes';

const callApi = async (url, fetchOptions) => {
  const response = await fetch(url, fetchOptions);
  if (response.status === 500) {
    throw new Error('ایراد سروری رخ داده‌است! ما رو مطلع کنید.');
  }

  if (response.status === 404) {
    throw new Error('صفحه مورد نظر یافت نشد!');
  }
  const json_response = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('TOKEN_EXPIRED');
    }
    if (json_response.error) {
      throw new Error(json_response.error);
    } else if (json_response.detail) {
      throw new Error(json_response.detail);
    } else if (json_response.message) {
      throw new Error(json_response.message);
    } else {
      throw new Error(response.text);
    }
  }
  return json_response;
};

export const CALL_API = 'Call API';

export default ({ getState }) => (next) => async (action) => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const actionWith = (data) => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  let { fetchOptions } = callAPI;
  const { url, types, payload } = callAPI;
  const [requestType, successType, failureType] = types;
  next(actionWith({ payload, type: requestType }));

  try {
    if (!fetchOptions.dontContentType) {
      fetchOptions.headers = {
        'Content-Type': 'application/json',
        ...fetchOptions.headers,
      };
    }
    const account = getState().account;
    if (!!account && !!account.token) {
      fetchOptions.headers = {
        ...fetchOptions.headers,
        Authorization: 'Bearer ' + account.token,
      };
    }
    const response = await callApi(url, fetchOptions);
    return next(
      actionWith({
        payload,
        response,
        type: successType,
      })
    );
  } catch (error) {
    if (error.message === 'TOKEN_EXPIRED') {
      return next(
        actionWith({
          type: actionTypes.LOGOUT_REQUEST,
          error: error.message || 'Something bad happened!',
        })
      );
    }
    return next(
      actionWith({
        type: failureType,
        error: error.message || 'Something bad happened!',
      })
    );
  }
};
