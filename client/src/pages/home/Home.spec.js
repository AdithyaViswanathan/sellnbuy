import { render, screen } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

describe('home tests', () => {
  it('should render a message', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const messageElement = await screen.findByTestId('message');

    expect(messageElement).toBeInTheDocument();
  });

  it('should render a get started button', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
    const messageElement = await screen.findByText('Get Started Now');

    expect(messageElement).toBeInTheDocument();
  });
});
