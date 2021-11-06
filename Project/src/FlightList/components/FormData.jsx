import React, { useState } from 'react';

import { fetchFlights, departuresFilter, arrivalsFilter } from '../flightsGateway';

const FormData = ({ setSearchDataDeparture, setSearchDataArrival }) => {
  const [formData, setFormData] = useState();

  const handleChange = event => {
    setFormData(event.target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(formData);

    fetchFlights().then(data => {
      setSearchDataDeparture(departuresFilter(data, formData));
      setSearchDataArrival(arrivalsFilter(data, formData));
    });
  };
  return (
    <form action="" className="form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Номер рейсу або місто" onChange={handleChange} />
      <button type="submit">Знайти</button>
    </form>
  );
};

export default FormData;
