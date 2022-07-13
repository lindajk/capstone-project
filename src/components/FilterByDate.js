import {useState} from 'react';
import styled from 'styled-components';

export default function FilterByDate({selectedOption, selectEventsByDate, options}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);
  const onEvent = date => {
    selectEventsByDate(date);
    toggleOpen();
  };

  return (
    <DropDownList name={selectedOption}>
      {options.map(({name, id}) => (
        <ListItem onClick={() => onEvent(name)} key={id}>
          {name}
        </ListItem>
      ))}
    </DropDownList>
  );
}

const DropDownList = styled.select`
  background: white;
  text-align: center;
`;

const ListItem = styled.option`
  list-style: none;
`;
