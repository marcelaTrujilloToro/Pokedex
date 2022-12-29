import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {TabsComponent} from './src/navigator/Tabs';

export const App = () => {
  return (
    <NavigationContainer>
      <TabsComponent />
    </NavigationContainer>
  );
};

export default App;
