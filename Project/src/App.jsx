import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import FlightsList from './FlightList/components/FlightsList';
import store from './store';

const App = () => (
  <BrowserRouter>
    <Provider store={store}>
      <Route>
        <FlightsList />
      </Route>
    </Provider>
  </BrowserRouter>
);

export default App;
