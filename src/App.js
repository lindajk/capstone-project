import {useState} from 'react';
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
      name: 'All Categories',
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
      id: 4,
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
        <EventlistButton showBookmarked onClick={() => setShowBookmarked(false)}>
          Event List
        </EventlistButton>
        <Logo>EventNavi</Logo>
        <NavigationButton showBookmarkednp onClick={() => setShowBookmarked(true)}>
          Bookmarks
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
  background-color: lightgrey;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Logo = styled.div`
  margin: 10px;
  height: 2rem;
  width: 10rem;
`;

const EventlistButton = styled.button`
  margin: 10px;
  height: 2rem;
  width: 15rem;
  background-color: ${props => (props.isBookmarked === true ? 'grey' : 'blue')};
  color: ${props => (props.isBookmarked === true ? 'darkgrey' : 'white')};
`;

const NavigationButton = styled.button`
  margin: 10px;
  height: 2rem;
  width: 15rem;
  background-color: ${props => (props.isBookmarked === true ? 'grey' : 'blue')};
  color: ${props => (props.isBookmarked === true ? 'darkgrey' : 'white')};
`;

const FilterContainer = styled.div`
  display: grid;
  grid-template-columns: 3;
`;
