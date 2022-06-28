import {useEffect, useState} from 'react';
import styled from 'styled-components';

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch(
          'https://app.ticketmaster.com/discovery/v2/events.json?classificationName=festival&apikey=5I30P7cDjRjyvGDo67WGAE2BhhTwRxXt'
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
    <StyledList>
      {events.map(event => (
        <StyledListItem key={event.id}>
          <img src={event.images[0].url} alt="none" width="120" height="90"></img>
          <StyledListItemContainer>
            <StyledListItemEventName>{event.name}</StyledListItemEventName>
            <StyledListItemLocation>
              {event._embedded.venues[0].name} | {event._embedded.venues[0].city.name}
            </StyledListItemLocation>
            <li>{event.dates.start.localDate}</li>
          </StyledListItemContainer>
        </StyledListItem>
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

const StyledListItem = styled.ul`
  border: 1px solid #000;
  display: flex;
  flex-direction: row;
  margin: 0;
  padding: 0;
  img {
    padding: 0.2rem;
    width: 120;
    height: 90;
  }
`;

const StyledListItemEventName = styled.li`
  font-weight: bold;
`;

const StyledListItemLocation = styled.li`
  color: darkgoldenrod;
`;
