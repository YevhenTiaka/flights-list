import React from 'react';
import { connect } from 'react-redux';
import { flightsListSelector } from '../flightsList.selectors';
import { statusFunction, formatTime } from '../flightsGateway';
import NotFound from './NotFound';
// eslint-disable-next-line arrow-body-style

const Departures = ({ flightsList, searchDataDeparture }) => {
  const list = searchDataDeparture ?? flightsList;

  console.log(searchDataDeparture);
  return (
    <div className="tabs-container">
      <table className="flights">
        <thead className="flights-nav">
          <tr>
            <th className="flights-nav_item">Терминал</th>
            <th className="flights-nav_item">Розклад</th>
            <th className="flights-nav_item">Прилітає з</th>
            <th className="flights-nav_item">Статус</th>
            <th className="flights-nav_item">Авиакомпания</th>
            <th className="flights-nav_item">Рейс</th>
          </tr>
        </thead>

        {list.length ? (
          list.map(el => {
            const { term, timeTakeofFact, status, timeDepShedule } = el;
            const city = el['airportToID.city'];
            const company = el.airline.en.name;
            const flightNumber = el.codeShareData[0].codeShare;
            const logo = el.codeShareData[0].airline.en.logoSmallName;

            return (
              <tbody className="flights-list" key={flightNumber}>
                <tr>
                  <td>
                    <span>{term}</span>
                  </td>
                  <td>{formatTime(timeDepShedule)}</td>
                  <td>{city}</td>
                  <td>
                    <span>{statusFunction(status, timeTakeofFact)}</span>
                  </td>
                  <td>
                    <div className="flight-item_box">
                      <img className="flight-img" src={logo} alt={company} />
                      <span>{company}</span>
                    </div>
                  </td>
                  <td>{flightNumber}</td>
                </tr>
              </tbody>
            );
          })
        ) : (
          <NotFound />
        )}
      </table>
    </div>
  );
};

const mapState = state => ({
  flightsList: flightsListSelector(state),
});
export default connect(mapState)(Departures);
