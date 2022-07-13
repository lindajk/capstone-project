import {useEffect, useState} from 'react';
import styled from 'styled-components';

export default function EventList({events, updateEvents, selectedFilter}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadedPage, setLoadedPage] = useState(0);
  const fetchEvent = page => {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=DE&page=${page}&sort=date,asc&apikey=5I30P7cDjRjyvGDo67WGAE2BhhTwRxXt`
    )
      .then(response => response.json())
      .then(data => {
        const eventsToSet = data._embedded.events.map(event => {
          const newEventObject = {
            id: event.id,
            image: event.images[0].url,
            name: event.name,
            city: event._embedded.venues[0].city.name,
            date: event.dates.start.localDate,
            time: event.dates.start.localTime,
            address:
              typeof event._embedded.venues[0].address === 'undefined' ? '' : event._embedded.venues[0].address.line1,
            category: event.classifications[0].segment.name,
            isBookmarked: false,
          };
          return newEventObject;
        });
        updateEvents(eventsToSet);
        setLoadedPage(loadedPage + 1);
        setLoading(false);
        setError(null);
      })
      .catch(err => {
        setLoading(false);
        //  setError(err.message);
      });
  };

  useEffect(() => {
    fetchEvent(loadedPage);
  }, [loadedPage]);

  const loadMoreEvents = () => {
    fetchEvent(loadedPage);
  };

  function filterArray(arrayToFilter, searchObjects = []) {
    return arrayToFilter.filter(data => {
      return searchObjects.every(
        searchObject => searchObject.searchValue === 'all' || data[searchObject.searchKey] === searchObject.searchValue
      );
    });
  }
  const filteredEvents = filterArray(events, selectedFilter);

  return (
    <StyledList role="list">
      {error && <div>{error}</div>}
      {loading && <div> Data is Loading...</div>}
      {filteredEvents.map(event => {
        return (
          <StyledListCard key={event.id}>
            <img src={event.image} alt="none" width="120" height="90"></img>
            <StyledListItemContainer>
              <StyledListItemEventName>{event.name}</StyledListItemEventName>
              <StyledListItemCity>{event.city}</StyledListItemCity>
              <li>
                {event.date} {event.time}
              </li>
              <StyledListItemLocation>{event.address}</StyledListItemLocation>
              <StyledListItemSegment>Category: {event.category}</StyledListItemSegment>
            </StyledListItemContainer>
          </StyledListCard>
        );
      })}
      <LoadMoreButton onClick={loadMoreEvents}>Weitere anzeigen</LoadMoreButton>
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
  font-size: medium;
`;
const StyledListItemSegment = styled.li`
  font-style: italic;
  font-size: medium;
  color: grey;
`;

const LoadMoreButton = styled.button`
  color: black;
  padding: 0.5rem;
`;
