import {useEffect, useState} from 'react';

export default function App() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch(
          'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=5I30P7cDjRjyvGDo67WGAE2BhhTwRxXt'
        );
        const data = await response.json();
        setEvents(data._embedded.events);
      } catch (error) {
        console.log(error);
      }
    }

    loadEvents();
  }, []);
  // console.log(events);
  return (
    <main className="App">
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name}
            {event.name}
            {event.dates.start.localDate}
            {event.dates.start.localTime}
          </li>
        ))}
      </ul>
    </main>
  );
}
