import { render, screen } from '@testing-library/react';
import Admin from './Admin';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

describe('admin card tests', () => {
  it('should render a Card', async () => {
    render(
      <BrowserRouter>
        <Admin/>
      </BrowserRouter>
    );
    const messageElement = await screen.findByTestId('message');

    expect(messageElement).toBeInTheDocument();
  });

});
