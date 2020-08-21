/*
  App config for apis
*/
const Host = 'jimbooexchange.com/php_api';
const Paths = {
  GetWeblog: 'get_all_blog.php',
};
const ApiConstants = {
  BASE_URL: `http://${Host}/`,
  weblog: {
    get: `${Paths.GetWeblog}`,
  },
};
export const prefix = ApiConstants.BASE_URL;
