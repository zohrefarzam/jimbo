import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function goBack(key) {
  _navigator.dispatch(
    NavigationActions.back({
      key: key,
    }),
  );
}

// add other navigation functions that you need and export them
function navigateAndReset(routeName, params) {
  _navigator.dispatch(
    StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    }),
  );
}

export default {
  navigate,
  navigateAndReset,
  goBack,
  setTopLevelNavigator,
};
