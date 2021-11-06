import React, { useState, useEffect } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import FormData from './FormData';
import Arrivals from './Arrivals';
import Departures from './Departures';
import * as flightsGateway from '../flightsGateway';
import * as flightsActions from '../flights.actions';

// eslint-disable-next-line arrow-body-style
const FlightsList = ({ getDeparturesFlightsList, getArrivalsFlightsList }) => {
  const [searchDataDeparture, setSearchDataDeparture] = useState(null);
  const [searchDataArrival, setSearchDataArrival] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');

  useEffect(() => {
    if (flightsGateway.pathName === '/departures') {
      getDeparturesFlightsList();
    }

    if (flightsGateway.pathName === '/arrivals') {
      getArrivalsFlightsList();
    }
    if (search) {
      flightsGateway.fetchFlights().then(data => {
        setSearchDataDeparture(flightsGateway.departuresFilter(data, search));
        setSearchDataArrival(flightsGateway.arrivalsFilter(data, search));
      });
    }
  }, []);

  const departureLink = !search ? 'departures' : `departures?search=${search}`;
  const arrivalLink = !search ? 'arrivals' : `arrivals?search=${search}`;
  return (
    <BrowserRouter>
      <main className="main">
        <h2 className="title">ПОШУК РЕЙСУ</h2>
        <FormData
          setSearchDataDeparture={setSearchDataDeparture}
          setSearchDataArrival={setSearchDataArrival}
        />
        <div className="nav-link">
          <Link to={departureLink} className="nav-link-item" onClick={getDeparturesFlightsList}>
            Виліт
          </Link>
          <Link to={arrivalLink} className="nav-link-item" onClick={getArrivalsFlightsList}>
            Приліт
          </Link>
        </div>

        <Route exact path="/departures">
          <Departures searchDataDeparture={searchDataDeparture} />
        </Route>
        <Route path="/arrivals">
          <Arrivals searchDataArrival={searchDataArrival} />
        </Route>
      </main>
    </BrowserRouter>
  );
};

const mapDispatch = {
  getDeparturesFlightsList: flightsActions.getDeparturesFlightsList,
  getArrivalsFlightsList: flightsActions.getArrivalsFlightsList,
};
export default connect(null, mapDispatch)(FlightsList);
