import {useEffect, useState} from 'react';
import styled from 'styled-components';

export default function EventList({events, setEvents}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=DE&startDateTime=2022-07-01T14:00:00Z&endDateTime=2022-12-31T14:00:00Z&sort=date,asc&apikey=5I30P7cDjRjyvGDo67WGAE2BhhTwRxXt'
    )
      .then(response => {
        if (!response.ok) {
          throw Error('NetworkError when attempting to fetch resource');
        }
        return response.json();
      })
      .then(data => {
        setEvents(data._embedded.events);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
  }, [setEvents]);

  return (
    <StyledList role="list">
      {error && <div>{error}</div>}
      {loading && <div> Data is Loading...</div>}
      {events.map(event => (
        <StyledListCard key={event.id}>
          <img src={event.images[0].url} alt="none" width="120" height="90"></img>
          <StyledListItemContainer>
            <StyledListItemEventName>{event.name}</StyledListItemEventName>
            <StyledListItemCity>{event._embedded.venues[0].city.name}</StyledListItemCity>
            <li>
              {event.dates.start.localDate} {event.dates.start.localTime}
            </li>
            <StyledListItemLocation>{event._embedded.venues[0].address.line1}</StyledListItemLocation>
          </StyledListItemContainer>
        </StyledListCard>
      ))}
    </StyledList>
  );
}

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledListItemContainer = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledListCard = styled.ul`
  border: 1px solid #000;
  display: flex;
  flex-direction: row;
  margin: 0.2rem;
  padding: 0.2rem 2rem 0.2rem 0.2rem;
  img {
    padding: 0.2rem;
    width: 120;
    height: 90;
  }
`;

const StyledListItemEventName = styled.li`
  font-weight: bold;
`;

const StyledListItemCity = styled.li`
  color: darkgoldenrod;
`;

const StyledListItemLocation = styled.li`
  font-style: italic;
  font-size: medium;
`;
