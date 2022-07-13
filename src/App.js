import {useState} from 'react';
import styled from 'styled-components';

import EventList from './components/EventList';
import FilterByCat from './components/FilterByCat';
import FilterByCity from './components/FilterByCity';
import FilterByDate from './components/FilterByDate';

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState('All Cities');
  const [selectedDate, setSelectedDate] = useState('All Upcoming Events');
  const [selectedCat, setSelectedCat] = useState('All Categories');
  const [events, setEvents] = useState([]);

  const locations = [
    {
      id: 1,
      name: 'All Cities',
    },
    {
      id: 2,
      name: 'Berlin',
    },
    {
      id: 3,
      name: 'Cologne',
    },
    {
      id: 4,
      name: 'Frankfurt am Main',
    },
    {
      id: 5,
      name: 'Hamburg',
    },
    {
      id: 6,
      name: 'Munich',
    },
  ];

  const dates = [
    {
      id: 1,
      name: 'All Upcoming Events',
    },
    {
      id: 2,
      name: 'Today',
    },
    {
      id: 3,
      name: 'Tomorrow',
    },
  ];

  const categories = [
    {
      id: 1,
      name: 'All Categories',
    },
    {
      id: 2,
      name: 'Music',
    },
    {
      id: 3,
      name: 'Miscellaneous',
    },
  ];

  function selectEventsByLocation(selectedEvent) {
    setSelectedLocation(selectedEvent);
  }

  function selectEventsByDate(selectedEvent) {
    setSelectedDate(selectedEvent);
  }

  function selectEventsByCat(selectedEvent) {
    setSelectedCat(selectedEvent);
  }

  function updateEvents(eventsToChoose) {
    setEvents([...events, ...eventsToChoose]);
  }

  return (
    <main className="App">
      <FilterContainer>
        <FilterByCity
          options={locations}
          selectedOption={selectedLocation}
          selectEventsByLocation={selectEventsByLocation}
        ></FilterByCity>
        <FilterByDate
          options={dates}
          selectedOption={selectedDate}
          selectEventsByDate={selectEventsByDate}
        ></FilterByDate>
        <FilterByCat
          options={categories}
          selectedOption={selectedCat}
          selectEventsByCat={selectEventsByCat}
        ></FilterByCat>
      </FilterContainer>
      <EventList selectedLocation={selectedLocation} events={events} updateEvents={updateEvents}></EventList>
    </main>
  );
}

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
`;
