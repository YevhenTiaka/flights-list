import moment from 'moment';
import * as flightsGateway from './flightsGateway';

export const ARRIVALS_FLIGHTS_LIST = 'ARRIVALS_FLIGHTS_LIST';
export const DEPARTURES_FLIGHTS_LIST = 'DEPARTURES_FLIGHTS_LIST';

export const arrivalsFlightsList = flightsList => {
  const action = {
    type: ARRIVALS_FLIGHTS_LIST,
    payload: {
      flightsList,
    },
  };
  return action;
};

export const departuresFlightsList = flightsList => {
  const action = {
    type: DEPARTURES_FLIGHTS_LIST,
    payload: {
      flightsList,
    },
  };
  return action;
};

export const getDeparturesFlightsList = () => {
  const thunkAction = function (dispatch) {
    flightsGateway
      .fetchFlights()
      .then(data =>
        data.body.departure.filter(
          el =>
            moment(new Date(el.timeDepShedule)).format('DD-MM-YYYY') === flightsGateway.currentDay,
        ),
      )
      .then(flightsListData => {
        dispatch(departuresFlightsList(flightsListData));
      });
  };
  return thunkAction;
};

export const getArrivalsFlightsList = () => {
  const thunkAction = function (dispatch) {
    flightsGateway
      .fetchFlights()
      .then(data =>
        data.body.arrival.filter(
          el => moment(new Date(el.timeToStand)).format('DD-MM-YYYY') === flightsGateway.currentDay,
        ),
      )
      .then(flightsListData => {
        dispatch(arrivalsFlightsList(flightsListData));
      });
  };
  return thunkAction;
};
