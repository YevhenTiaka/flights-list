import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchFlights, departuresFilter, arrivalsFilter } from '../../flightsGateway';
import './formData.scss';

const FormData = ({ setSearchDataDeparture, setSearchDataArrival }) => {
  const history = useHistory();
  const [formData, setFormData] = useState('');

  const params = new URLSearchParams(window.location.search);
  const search = params.get('search');

  useEffect(() => {
    if (search) {
      setFormData(search);
    }
  }, []);
  const handleChange = event => {
    setFormData(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const pathName = window.location.pathname;
    const defaultPath = pathName !== '/' ? pathName : '/departures';

    const link = formData ? `${defaultPath}?search=${formData}` : pathName;
    fetchFlights().then(data => {
      setSearchDataDeparture(departuresFilter(data, formData));
      setSearchDataArrival(arrivalsFilter(data, formData));
    });
    history.push(link);
  };
  return (
    <div className="form">
      <div className="form-container">
        <h2 className="form-title">ПОШУК РЕЙСУ</h2>
        <form className="form-request" onSubmit={handleSubmit}>
          <i className="fas fa-search" />
          <input
            className="form-search_input"
            value={formData}
            type="text"
            placeholder="Номер рейсу або місто"
            onChange={handleChange}
          />

          <button className="form-submit_btn" type="submit">
            Знайти
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormData;
