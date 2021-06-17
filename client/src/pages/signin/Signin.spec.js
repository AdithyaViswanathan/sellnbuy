import { act, render, screen, fireEvent } from '@testing-library/react';
import Signin from './Signin';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

jest.mock('axios', () => {
  return {
    post: jest.fn(),
  };
});

describe('signin tests', () => {
  it('should render a message', async () => {
    render(
      <BrowserRouter>
        <Signin />
      </BrowserRouter>
    );
    const formElement = await screen.findByTestId('signin-form');

    expect(formElement).toBeInTheDocument();
  });

  // it('should post data correctly', async done => {
  //   const mockedData = { email: 'email@email.com', password: 'password' };
  //   render(
  //     <BrowserRouter>
  //       <Signin />
  //     </BrowserRouter>
  //   );

  //   // const formElement = await screen.findByTestId('signin-form');

  //   const button = await screen.findByTestId('submit-btn');

  //   expect(button).toBeInTheDocument();

  //   act(() => {
  //     fireEvent.click(button);
  //     const postSpy = jest.spyOn(axios, 'post');

  //     expect(postSpy).toBeCalled();
  //   });
  // });

  //   it('should render a get started button', async () => {
  //     render(
  //       <BrowserRouter>
  //         <Home />
  //       </BrowserRouter>
  //     );
  //     const messageElement = await screen.findByText('Get Started Now');

  //     expect(messageElement).toBeInTheDocument();
  //   });
});
