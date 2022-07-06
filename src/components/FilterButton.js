import {useState} from 'react';
import styled from 'styled-components';

export default function FilterButton({selectedOption, selectEvents, options}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const onEvent = city => {
    selectEvents(city);
    toggleOpen();
  };

  return (
    <DropDownContainer>
      <DropDownList name={selectedOption}>
        {options.map(({name, id}) => (
          <ListItem onClick={() => onEvent(name)} key={id}>
            {name}
          </ListItem>
        ))}
      </DropDownList>
    </DropDownContainer>
  );
}

const DropDownContainer = styled.div`
  width: 50%;
`;

const DropDownList = styled.select`
  padding: 0 0 0 1em;
  background: white;
  border: 2px solid lightgrey;
  box-sizing: border-box;
  color: blue;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled.option`
  list-style: none;
  margin-bottom: 0.8em;
`;
