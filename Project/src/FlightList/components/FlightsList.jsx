import React, { useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import FormData from './FormData';
import Arrivals from './Arrivals';
import Departures from './Departures';

import * as flightsActions from '../flights.actions';

// eslint-disable-next-line arrow-body-style
const FlightsList = ({ getDeparturesFlightsList, getArrivalsFlightsList }) => {
  const [searchDataDeparture, setSearchDataDeparture] = useState(null);
  const [searchDataArrival, setSearchDataArrival] = useState(null);

  return (
    <BrowserRouter>
      <main className="main">
        <h2 className="title">ПОШУК РЕЙСУ</h2>
        <FormData
          setSearchDataDeparture={setSearchDataDeparture}
          setSearchDataArrival={setSearchDataArrival}
        />
        <div className="nav-link">
          <Link
            to={`departures/?${window.location.search}`}
            className="nav-link-item"
            onClick={getDeparturesFlightsList}
          >
            Виліт
          </Link>
          <Link to="/arrivals" className="nav-link-item" onClick={getArrivalsFlightsList}>
            Приліт
          </Link>
        </div>
        <Switch>
          <Route exact path="/departures">
            <Departures searchDataDeparture={searchDataDeparture} />
          </Route>
          <Route path="/arrivals">
            <Arrivals searchDataArrival={searchDataArrival} />
          </Route>
        </Switch>
      </main>
    </BrowserRouter>
  );
};

const mapDispatch = {
  getDeparturesFlightsList: flightsActions.getDeparturesFlightsList,
  getArrivalsFlightsList: flightsActions.getArrivalsFlightsList,
};
export default connect(null, mapDispatch)(FlightsList);
