import {useState} from 'react';

import CityButton from './components/CityButton';
import EventList from './components/EventList';

export default function App() {
  const [selectedOption, setSelectedOption] = useState('All Cities');
  const [events, setEvents] = useState([]);

  function selectEvents(selectedEvent) {
    setSelectedOption(selectedEvent);
  }

  function updateEvents(eventsToChoose) {
    setEvents([...events, ...eventsToChoose]);
  }

  return (
    <main className="App">
      <CityButton
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectEvents={selectEvents}
      ></CityButton>
      <EventList selectedOption={selectedOption} events={events} updateEvents={updateEvents}></EventList>
    </main>
  );
}
