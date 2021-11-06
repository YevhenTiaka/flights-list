import moment from 'moment';

const baseUrl = 'https://api.iev.aero/api/flights';

export const currentDay = moment(new Date()).format('DD-MM-YYYY');

export const statusFunction = (status, time) => {
  if (status === 'FR') return 'В польоті';
  if (status === 'ON') return 'Вчасно';
  if (status === 'LN') return `Прибув ${moment(new Date(time)).format('H:mm')}`;
  if (status === 'CK') return 'Реєстрація';
  if (status === 'CC') return 'Реєстрація закінчена';
  if (status === 'BD') return 'Посадка';
  if (status === 'GC') return 'Посадка закінчена';
  if (status === 'DP' && !time) {
    return 'Вилетів';
  } else {
    return `Вилетів о ${moment(new Date(time)).format('H:mm')}`;
  }
};

export const formatTime = time => moment(new Date(time)).format('H:mm');

export const fetchFlights = () =>
  fetch(`${baseUrl}/${currentDay}`).then(response => {
    if (response.ok) {
      return response.json();
    }
  });

export const departuresFilter = (data, formData) =>
  data.body.departure.filter(el => {
    const elData = moment(new Date(el.actual)).format('DD-MM-YYYY');
    const currentCity = el['airportToID.city'].toLowerCase();
    const flightNumber = el.codeShareData[0].codeShare.toLowerCase();
    return (
      (flightNumber.includes(formData) && elData === currentDay) ||
      (currentCity.includes(formData) && elData === currentDay)
    );
  });
export const arrivalsFilter = (data, formData) =>
  data.body.arrival.filter(el => {
    const elData = moment(new Date(el.actual)).format('DD-MM-YYYY');
    const currentCity = el['airportFromID.city'].toLowerCase();
    const flightNumber = el.codeShareData[0].codeShare.toLowerCase();
    return (
      (flightNumber.includes(formData) && elData === currentDay) ||
      (currentCity.includes(formData) && elData === currentDay)
    );
  });

// term терминал
//  actual  расписание
// airportToID.city  направление
//  timeTakeOfFact статус
// airline.name авиакомпания
// codeShareData рейс

// body.departure.term;
// body.departure.actual;
// body.departure.airportToId.city;
// body.departure.timeTakeofFact;
// body.departure.airline.en.name;
// body.departure.codeShareData[0].codeShare;
// body.departure.logo
