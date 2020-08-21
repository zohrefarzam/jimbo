import React, {Component, useEffect} from 'react';
import NavigationStack from './NavigationStack';
import NavigationService from './NavigationService';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Linking} from 'react-native';
export default function AppNavigator() {
  useEffect(() => {
    const goToPage = (routeName, routeParams) =>
      setTimeout(
        () => NavigationService.navigate(routeName, routeParams),
        1000,
      );
    const handlePage = newUrl => {
      const {url} = newUrl;
      if (url?.toLowerCase().includes('buying')) {
        goToPage('Pay');
      }
    };
    Linking.addEventListener('url', handlePage);
    return () => {
      Linking.removeEventListener('url', handlePage);
    };
  }, []);
  const prefix = 'jimboo://';
  return (
    <SafeAreaProvider>
      <NavigationStack
        uriPrefix={prefix}
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </SafeAreaProvider>
  );
}
