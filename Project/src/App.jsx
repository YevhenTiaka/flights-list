import React from 'react';
import { Provider } from 'react-redux';
import FlightsList from './FlightList/components/FlightsList';
import store from './store';

const App = () => (
  <Provider store={store}>
    <FlightsList />
  </Provider>
);

export default App;
