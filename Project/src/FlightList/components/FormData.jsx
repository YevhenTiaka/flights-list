import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchFlights, departuresFilter, arrivalsFilter, pathName } from '../flightsGateway';

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
    setFormData(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    const defaultPath = pathName !== '/' ? pathName : '/departures';

    const link = formData ? `${defaultPath}?search=${formData}` : pathName;
    fetchFlights().then(data => {
      setSearchDataDeparture(departuresFilter(data, formData));
      setSearchDataArrival(arrivalsFilter(data, formData));
    });
    history.push(link);
  };
  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <input
        value={formData}
        type="text"
        placeholder="Номер рейсу або місто"
        onChange={handleChange}
      />
      <button type="submit">Знайти</button>
    </form>
  );
};

export default FormData;
