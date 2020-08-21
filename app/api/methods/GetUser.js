export const FETCH_USER_BEGIN = 'FETCH_USER_BEGIN';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const fetchUserSuccess = user => ({
  type: FETCH_USER_SUCCESS,
  payload: {user},
});
export const fetchUserFailure = error => ({
  type: FETCH_USER_FAILURE,
  payload: {error},
});
export const fetchUserBegin = () => ({
  type: FETCH_USER_BEGIN,
});

export function GetUser() {
  return dispatch => {
    dispatch(fetchUserBegin());
    return fetch('https://jimbooexchange.com/php_api/get_all_users.php')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchUserSuccess(json.data));
        return json;
      })
      .catch(error => dispatch(fetchUserFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
