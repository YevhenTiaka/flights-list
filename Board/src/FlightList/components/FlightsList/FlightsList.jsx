import React, { useState, useEffect } from 'react';
import { Link, Route, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import FormData from '../FormData/FormData';
import Flights from '../Flights/Flights';
import * as flightsGateway from '../../flightsGateway';
import * as flightsActions from '../../flights.actions';
import './flightsList.scss';

const FlightsList = ({ getDeparturesFlightsList, getArrivalsFlightsList }) => {
  const [searchDataDeparture, setSearchDataDeparture] = useState(null);
  const [searchDataArrival, setSearchDataArrival] = useState(null);

  const [depStatus, setDepStatus] = useState('active');
  const [arrStatus, setArrStatus] = useState('disabled');

  const depTheme = event => {
    if (!event.target.className.includes('active')) {
      setArrStatus('disabled');
      setDepStatus('active');
    }
  };

  const arrTheme = event => {
    if (!event.target.className.includes('active')) {
      setArrStatus('active');
      setDepStatus('disabled');
    }
  };

  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');

  useEffect(() => {
    // if (pathName === '/departures') {
    //   getDeparturesFlightsList();
    //   setDepStatus('active');
    //   setArrStatus('disabled');
    // }
    // if (pathName === '/arrivals') {
    //   getArrivalsFlightsList();
    //   setDepStatus('disabled');
    //   setArrStatus('active');
    // }
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
    <main className="main">
      <div className="main-container">
        <FormData
          setSearchDataDeparture={setSearchDataDeparture}
          setSearchDataArrival={setSearchDataArrival}
        />
        <div className="nav-link">
          <Link
            to={departureLink}
            className={`nav-link__item-dep nav-link__item-dep__${depStatus} `}
            onClick={getDeparturesFlightsList}
            onClickCapture={event => depTheme(event)}
          >
            <i className="fas fa-plane-departure" />
            Виліт
          </Link>
          <Link
            to={arrivalLink}
            className={`nav-link__item-arr nav-link__item-arr__${arrStatus} `}
            onClick={getArrivalsFlightsList}
            onClickCapture={event => arrTheme(event)}
          >
            <i className="fas fa-plane-arrival" />
            Приліт
          </Link>
        </div>
        <div className="tabs-container">
          <Route exact path="/departures">
            <Flights searchData={searchDataDeparture} />
          </Route>
          <Route path="/arrivals">
            <Flights searchData={searchDataArrival} />
          </Route>
        </div>
      </div>
    </main>
  );
};

const mapDispatch = {
  getDeparturesFlightsList: flightsActions.getDeparturesFlightsList,
  getArrivalsFlightsList: flightsActions.getArrivalsFlightsList,
};
export default connect(null, mapDispatch)(FlightsList);
