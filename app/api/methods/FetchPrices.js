export const FETCH_PRICES_BEGIN = 'FETCH_PRICES_BEGIN';
export const FETCH_PRICES_SUCCESS = 'FETCH_PRICES_SUCCESS';
export const FETCH_PRICES_FAILURE = 'FETCH_PRICES_FAILURE';
export const FETCH_SETTING = 'FETCH_SETTING';
export const FETCH_SETTING_ERROR = 'FETCH_SETTING_ERROR';
export const FETCH_DOLLAR = 'FETCH_DOLLAR';
export const FETCH_DOLLAR_ERROR = 'FETCH_DOLLAR_ERROR';
export const fetchSetting = setting => ({
  type: FETCH_SETTING,
  payload: {setting},
});
export const fetchDollar = dollar => ({
  type: FETCH_SETTING,
  payload: {dollar},
});
export const fetchDollarError = error => ({
  type: FETCH_DOLLAR_ERROR,
  payload: {error},
});
export const fetchPricesBegin = () => ({
  type: FETCH_PRICES_BEGIN,
});

export const fetchPricesSuccess = prices => ({
  type: FETCH_PRICES_SUCCESS,
  payload: {prices},
});

export const fetchPricesFailure = error => ({
  type: FETCH_PRICES_FAILURE,
  payload: {error},
});
export const fetchSettingError = error => ({
  type: FETCH_PRICES_FAILURE,
  payload: {error},
});
export function FetchDollar() {
  return dispatch => {
    return fetch('https://api.tgju.online/v1/data/sana/json')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchDollar(json));
        return json;
      })
      .catch(error => dispatch(fetchDollarError(error)));
  };
}
export function FetchSetting() {
  return dispatch => {
    return fetch('https://jimbooexchange.com/php_api/get_all_setting.php')
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchSetting(json.data));
        return json;
      })
      .catch(error => dispatch(fetchSettingError(error)));
  };
}
export function FetchPrices() {
  return dispatch => {
    dispatch(fetchPricesBegin());
    return fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false',
    )
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchPricesSuccess(json));
        return json;
      })
      .catch(error => dispatch(fetchPricesFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
