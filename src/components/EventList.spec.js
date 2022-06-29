import {render, screen} from '@testing-library/react';

import EventList from './EventList';

describe('EventList', () => {
  it('renders an list with events', () => {
    render(<EventList />);
    const eventList = screen.getByRole('list');
    expect(eventList).toBeInTheDocument();
  });
});
