import React, { useState, useEffect } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import FormData from '../FormData/FormData';
import Arrivals from '../Arrivals/Arrivals';
import Departures from '../Departures/Departures';
import * as flightsGateway from '../../flightsGateway';
import * as flightsActions from '../../flights.actions';
import './flightsList.scss';

const FlightsList = ({ getDeparturesFlightsList, getArrivalsFlightsList }) => {
  const [searchDataDeparture, setSearchDataDeparture] = useState(null);
  const [searchDataArrival, setSearchDataArrival] = useState(null);

  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');

  // const linkStyleDep = path => {
  //   const departuresStyles = { background: '#007bff', color: '#fff' };
  //   const arrivalsStyles = { background: '#fff', color: '#007bff' };
  //   if (path === '/departures') {
  //     return departuresStyles;
  //   }
  //   if (path === '/arrivals') {
  //     return arrivalsStyles;
  //   }
  // };

  // const linkStyleArr = path => {
  //   const departuresStyles = { background: '#fff', color: '#007bff' };
  //   const arrivalsStyles = { background: '#007bff', color: '#fff' };
  //   if (path === '/departures') {
  //     return departuresStyles;
  //   }
  //   if (path === '/arrivals') {
  //     return arrivalsStyles;
  //   }
  // };

  useEffect(() => {
    const pathName = window.location.pathname;
    if (pathName === '/departures') {
      getDeparturesFlightsList();
    }

    if (pathName === '/arrivals') {
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
    <main className="main">
      <div className="main-container">
        <FormData
          setSearchDataDeparture={setSearchDataDeparture}
          setSearchDataArrival={setSearchDataArrival}
        />
        <div className="nav-link">
          <Link
            // style={linkStyleDep(window.location.pathname)}
            to={departureLink}
            className="nav-link__item-dep"
            onClick={getDeparturesFlightsList}
          >
            <i className="fas fa-plane-departure">
              <span className="nav-link_direction__dep">Виліт</span>
            </i>
          </Link>
          <Link
            // style={linkStyleArr(window.location.pathname)}
            to={arrivalLink}
            className="nav-link__item-arr"
            onClick={getArrivalsFlightsList}
          >
            <i className="fas fa-plane-arrival arr_link">
              <span className="nav-link_direction__arr">Приліт</span>
            </i>
          </Link>
        </div>
        <div className="tabs-container">
          <Route exact path="/departures">
            <Departures searchDataDeparture={searchDataDeparture} />
          </Route>
          <Route path="/arrivals">
            <Arrivals searchDataArrival={searchDataArrival} />
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
