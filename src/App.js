import {useState} from 'react';

import EventList from './components/EventList';
import FilterButton from './components/FilterButton';

export default function App() {
  const [selectedLocation, setSelectedLocation] = useState('All Cities');
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

  function selectEvents(selectedEvent) {
    setSelectedLocation(selectedEvent);
  }

  function updateEvents(eventsToChoose) {
    setEvents([...events, ...eventsToChoose]);
  }

  return (
    <main className="App">
      <FilterButton options={locations} selectedOption={selectedLocation} selectEvents={selectEvents}></FilterButton>
      <EventList selectedLocation={selectedLocation} events={events} updateEvents={updateEvents}></EventList>
    </main>
  );
}
