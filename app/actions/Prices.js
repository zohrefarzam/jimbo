export const FETCH_PRICES_PENDING = 'FETCH_PRICES_PENDING';
export const FETCH_PRICES_SUCCESS = 'FETCH_PRICES_SUCCESS';
export const FETCH_PRICES_ERROR = 'FETCH_PRICES_ERROR';

export function fetchPricesPending() {
  return {
    type: FETCH_PRICES_PENDING,
  };
}

export function fetchPricesSuccess(products) {
  return {
    type: FETCH_PRICES_SUCCESS,
    products,
  };
}

export function fetchPricesError(error) {
  return {
    type: FETCH_PRICES_ERROR,
    error,
  };
}
