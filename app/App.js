/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import AppNavigator from './navigation';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {View, Text} from 'native-base';
import persist from './store';
const persistStore = persist();
class App extends Component {
  componentDidMount() {
    if (__DEV__) {
      console.disableYellowBox = true;
    }
  }
  render() {
    return (
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
export default App;
