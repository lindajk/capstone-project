import {useState} from 'react';
import styled from 'styled-components';

const options = ['All Cities', 'Berlin', 'Cologne', 'Frankfurt am Main', 'Hamburg', 'Munich'];

export default function CityButton({selectedOption, selectEvents}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const onEvent = city => {
    selectEvents(city);
    toggleOpen();
  };

  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggleOpen}>{selectedOption || 'Choose City'}</DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {options.map(option => (
              <ListItem onClick={() => onEvent(option)} key={Math.random()}>
                {option}
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}

const DropDownContainer = styled('div')`
  width: 50%;
  //margin: 0 auto;
`;

const DropDownHeader = styled('div')`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  background: #ffffff;
`;

const DropDownListContainer = styled('div')``;

const DropDownList = styled('ul')`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled('li')`
  list-style: none;
  margin-bottom: 0.8em;
`;
