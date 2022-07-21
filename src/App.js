import {useState} from 'react';
import {BsMusicNoteList} from 'react-icons/bs';
import {FaBookmark} from 'react-icons/fa';
import styled from 'styled-components';

import EventList from './components/EventList';
import FilterByCat from './components/FilterByCat';
import FilterByCity from './components/FilterByCity';
import FilterByDate from './components/FilterByDate';

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState([
    {
      searchKey: 'city',
      searchValue: 'all',
    },
    {
      searchKey: 'date',
      searchValue: 'all',
    },
    {
      searchKey: 'category',
      searchValue: 'all',
    },
  ]);
  const [events, setEvents] = useState([]);
  const [showBookmarked, setShowBookmarked] = useState(false);

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
      name: 'All Dates',
    },
    {
      id: 2,
      name: 'Today',
    },
    {
      id: 3,
      name: 'Tomorrow',
    },
    {
      id: 4,
      name: 'Day after Tomorrow',
    },
  ];

  const categories = [
    {
      id: 1,
      name: 'All Genres',
    },
    {
      id: 2,
      name: 'Arts & Theatre',
    },
    {
      id: 3,
      name: 'Miscellaneous',
    },
    {
      id: 4,
      name: 'Music',
    },
    {
      id: 5,
      name: 'Sports',
    },
  ];

  function selectEventsByLocation(selectedLocation) {
    const notToFilter = selectedFilter.filter(filterObject => filterObject.searchKey !== 'city');
    const newFilterArray = [
      ...notToFilter,
      {searchKey: 'city', searchValue: selectedLocation === 'All Cities' ? 'all' : selectedLocation},
    ];
    setSelectedFilter(newFilterArray);
  }

  function selectEventsByDate(selectedDate) {
    const actualDate = translateDate(selectedDate);
    function translateDate(dateToTranslate) {
      const date = new Date();
      if (dateToTranslate === 'Today') {
        return `${date.getFullYear()}-${
          (date.getMonth() + 1).toString().length > 1 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1).toString()
        }-${date.getDate()}`;
      } else if (dateToTranslate === 'Tomorrow') {
        return `${date.getFullYear()}-${
          (date.getMonth() + 1).toString().length > 1 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1).toString()
        }-${date.getDate() + 1}`;
      } else if (dateToTranslate === 'Day after Tomorrow') {
        return `${date.getFullYear()}-${
          (date.getMonth() + 1).toString().length > 1 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1).toString()
        }-${date.getDate() + 2}`;
      } else {
        return dateToTranslate;
      }
    }
    const notToFilter = selectedFilter.filter(filterObject => filterObject.searchKey !== 'date');
    const newFilterArray = [
      ...notToFilter,
      {searchKey: 'date', searchValue: actualDate === 'All Dates' ? 'all' : actualDate},
    ];
    setSelectedFilter(newFilterArray);
  }

  function selectEventsByCat(selectedCat) {
    const notToFilter = selectedFilter.filter(filterObject => filterObject.searchKey !== 'category');
    const newFilterArray = [
      ...notToFilter,
      {searchKey: 'category', searchValue: selectedCat === 'All Categories' ? 'all' : selectedCat},
    ];
    setSelectedFilter(newFilterArray);
  }

  function updateEvents(eventsToChoose) {
    setEvents([...events, ...eventsToChoose]);
  }

  function handleBookmark(idToBookmark) {
    const index = events.findIndex(event => event.id === idToBookmark);
    const eventToBookmark = events.find(event => event.id === idToBookmark);
    const bookmarkedEvent = {...eventToBookmark, isBookmarked: !eventToBookmark.isBookmarked};
    const newEvents = [...events.slice(0, index), bookmarkedEvent, ...events.slice(index + 1)];
    setEvents(newEvents);
  }
  return (
    <main className="App">
      <Header>
        <EventlistButton bookmarked={showBookmarked} onClick={() => setShowBookmarked(false)}>
          <BsMusicNoteList></BsMusicNoteList>
        </EventlistButton>
        <Logo>Event Xplorer</Logo>
        <NavigationButton bookmarked={showBookmarked} onClick={() => setShowBookmarked(true)}>
          <FaBookmark></FaBookmark>
        </NavigationButton>
      </Header>
      {!showBookmarked && (
        <FilterContainer>
          <FilterByCity
            options={locations}
            selectedFilter={selectedFilter}
            selectEventsByLocation={selectEventsByLocation}
          ></FilterByCity>
          <FilterByDate
            options={dates}
            selectedFilter={selectedFilter}
            selectEventsByDate={selectEventsByDate}
          ></FilterByDate>
          <FilterByCat
            options={categories}
            selectedFilter={selectedFilter}
            selectEventsByCat={selectEventsByCat}
          ></FilterByCat>
        </FilterContainer>
      )}
      <EventList
        showBookmarked={showBookmarked}
        onBookmark={handleBookmark}
        selectedFilter={selectedFilter}
        events={events}
        updateEvents={updateEvents}
      ></EventList>
    </main>
  );
}

const Header = styled.header`
  background-color: crimson;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Logo = styled.div`
  color: white;
  letter-spacing: 1px;
  margin: 10px;
  height: 2.5rem;
  width: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  font-size: x-large;
  text-shadow: 2px 2px black;
`;

const EventlistButton = styled.button`
  margin: 10px;
  height: 2.5rem;
  width: 3rem;
  border-radius: 0.8rem;
  background-color: ${props => (props.bookmarked ? 'lightgrey' : 'black')};
  color: ${props => (props.bookmarked ? 'grey' : 'white')};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavigationButton = styled.button`
  margin: 10px;
  height: 2.5rem;
  width: 3rem;
  border-radius: 0.8rem;
  background-color: ${props => (props.bookmarked ? 'black' : 'lightgrey')};
  color: ${props => (props.bookmarked ? 'white' : 'grey')};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: 3;
  height: 48px;
`;
