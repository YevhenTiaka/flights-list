import React from 'react';
import { connect } from 'react-redux';
import { flightsListSelector } from '../../flightsList.selectors';
import { statusFunction, formatTime } from '../../flightsGateway';
import NotFound from '../NotFound/NotFound';
import terminalStyles from '../../styles/flightsStyles';
import './arrivals.scss';

const Arrivals = ({ flightsList, searchDataArrival }) => {
  const list = searchDataArrival ?? flightsList;
  const notFound = searchDataArrival !== null ? <NotFound /> : null;
  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');
  if (search && !searchDataArrival && flightsList) {
    return null;
  }
  const display = list.length ? null : { display: 'none' };

  return (
    <table className="flights">
      <thead className="flights-nav" style={display}>
        <tr>
          <th className="flights-nav_item__term">Термiнал</th>
          <th className="flights-nav_item">Розклад</th>
          <th className="flights-nav_item">Прилітає з</th>
          <th className="flights-nav_item">Статус</th>
          <th className="flights-nav_item">Авiакомпанiя</th>
          <th className="flights-nav_item">Рейс</th>
        </tr>
      </thead>
      {list.length
        ? list.map(el => {
            console.log(el);
            const { term, timeLandFact, status, timeToStand } = el;
            const city = el['airportFromID.city'];
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
                  <td className="flights-list_item">{formatTime(timeToStand)}</td>
                  <td className="flights-list_item">{city}</td>
                  <td>
                    <span className="flights-list_item">
                      {statusFunction(status, timeLandFact)}
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
export default connect(mapState)(Arrivals);
