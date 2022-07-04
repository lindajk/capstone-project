import {useState} from 'react';

import CityButton from './components/CityButton';
import EventList from './components/EventList';

export default function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [events, setEvents] = useState([]);

  const filteredByCity = events.filter(data => {
    return data._embedded.venues[0].city.name === {selectedOption};
  });

  function allEvents() {
    setSelectedOption('All Cities');
    setEvents(events);
  }

  return (
    <main className="App">
      <CityButton
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        allEvents={allEvents}
      ></CityButton>
      <EventList events={filteredByCity} setEvents={setEvents}></EventList>;
    </main>
  );
}
