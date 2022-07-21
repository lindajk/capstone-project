import {useEffect, useState} from 'react';
import {FaRegBookmark} from 'react-icons/fa';
import {FaBookmark} from 'react-icons/fa';
import {GrLocationPin} from 'react-icons/gr';
import styled from 'styled-components';

export default function EventList({events, updateEvents, selectedFilter, onBookmark, showBookmarked}) {
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

  function filterArray(arrayToFilter, searchObjects = []) {
    return arrayToFilter.filter(data => {
      return searchObjects.every(
        searchObject => searchObject.searchValue === 'all' || data[searchObject.searchKey] === searchObject.searchValue
      );
    });
  }
  const filteredEvents = showBookmarked
    ? events.filter(event => event.isBookmarked)
    : filterArray(events, selectedFilter);

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
              <StyledListItemCity>
                {event.city}{' '}
                <StyledListItemLocation>
                  <GrLocationPin></GrLocationPin>
                  {event.address}
                </StyledListItemLocation>
              </StyledListItemCity>
              <li>
                {event.date} {event.time}
              </li>
              <StyledListItemSegment>Category: {event.category}</StyledListItemSegment>
            </StyledListItemContainer>
            <div onClick={() => onBookmark(event.id)}>
              {event.isBookmarked ? <FaBookmark></FaBookmark> : <FaRegBookmark></FaRegBookmark>}
            </div>
          </StyledListCard>
        );
      })}
    </StyledList>
  );
}

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledListItemContainer = styled.li`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledListCard = styled.ul`
  border-bottom: 1px solid lightgrey;
  display: grid;
  grid-template-columns: 120px 220px auto;
  margin: 0.2rem;
  padding: 0.2rem 2rem 0.2rem 0.2rem;
  img {
    padding: 0.2rem;
    width: 120;
    height: 90;
  }
  line-height: 25px;
`;

const StyledListItemEventName = styled.li`
  font-weight: bold;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const StyledListItemCity = styled.li`
  color: crimson;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

const StyledListItemLocation = styled.span`
  color: black;
`;
const StyledListItemSegment = styled.li`
  font-style: italic;
  font-weight: lighter;
  color: grey;
`;
