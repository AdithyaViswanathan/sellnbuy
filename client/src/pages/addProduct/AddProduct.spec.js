import { render, screen } from '@testing-library/react';
import AddProduct from './AddProduct';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

describe('add product tests', () => {
  it('should render a Heading', async () => {
    render(
      <BrowserRouter>
        <AddProduct />
      </BrowserRouter>
    );
    const messageElement = await screen.findByTestId('message');

    expect(messageElement).toBeInTheDocument();
  });

  it('should render a add Product button', async () => {
    render(
      <BrowserRouter>
        <AddProduct />
      </BrowserRouter>
    );
    const messageElement = await screen.findByText('Add');

    expect(messageElement).toBeInTheDocument();
  });
});
