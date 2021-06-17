import { render, screen } from '@testing-library/react';
import AdminCard from './AdminCard';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

describe('admin card tests', () => {
  it('should render a Card', async () => {
    render(
      <BrowserRouter>
        <AdminCard admin={'1','a','a','1'} approve={1} reject={0}/>
      </BrowserRouter>
    );
    const messageElement = await screen.findByTestId('message');

    expect(messageElement).toBeInTheDocument();
  });

});
