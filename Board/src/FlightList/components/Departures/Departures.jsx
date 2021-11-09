import React from 'react';
import { connect } from 'react-redux';
import { flightsListSelector } from '../../flightsList.selectors';
import { statusFunction, formatTime } from '../../flightsGateway';
import NotFound from '../NotFound/NotFound';
import terminalStyles from '../../styles/flightsStyles';
import './departures.scss';

const Departures = ({ flightsList, searchDataDeparture }) => {
  const list = searchDataDeparture ?? flightsList;
  const notFound = searchDataDeparture !== null ? <NotFound /> : null;

  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');

  if (search && !searchDataDeparture && flightsList) {
    return null;
  }

  const display = list.length ? null : { display: 'none' };

  return (
    <table className="flights">
      <thead className="flights-nav" style={display}>
        <tr>
          <th className="flights-nav_item__term">Термiнал</th>
          <th className="flights-nav_item">Розклад</th>
          <th className="flights-nav_item">Напрямок</th>
          <th className="flights-nav_item">Статус</th>
          <th className="flights-nav_item">Авiакомпанiя</th>
          <th className="flights-nav_item">Рейс</th>
        </tr>
      </thead>

      {list.length
        ? list.map(el => {
            const { term, timeTakeofFact, status, timeDepShedule } = el;
            const city = el['airportToID.city'];
            const company = el.airline.ua.name;
            const flightNumber = el.codeShareData[0].codeShare;
            const logo = el.codeShareData[0].airline.en.logoSmallName;

            return (
              <tbody className="flights-list" key={el.ID}>
                <tr>
                  <td className="flights-list_item__terminal">
                    <span className="flights-list_item__terminal-skin" style={terminalStyles(term)}>
                      {term}
                    </span>
                  </td>
                  <td className="flights-list_item">{formatTime(timeDepShedule)}</td>
                  <td className="flights-list_item">{city}</td>
                  <td>
                    <span className="flights-list_item">
                      {statusFunction(status, timeTakeofFact)}
                    </span>
                  </td>
                  <td>
                    <div className="flights-list_item__box">
                      <img className="flights-list_item__logo" src={logo} alt={company} />
                      <span className="flights-list_item__company">{company}</span>
                    </div>
                  </td>
                  <td className="flights-list_item">{flightNumber}</td>
                </tr>
              </tbody>
            );
          })
        : notFound}
    </table>
  );
};

const mapState = state => ({
  flightsList: flightsListSelector(state),
});
export default connect(mapState)(Departures);
