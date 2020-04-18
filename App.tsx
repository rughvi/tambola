
import React from 'react';
import appStore from './store/appStore';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/NavigationHandler';
declare const global: {HermesInternal: null | {}};

const App = () => {
  return (
    <Provider store={appStore}>
      <AppNavigator></AppNavigator>
    </Provider>
  );
};
export default App;
