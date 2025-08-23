// Header.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Header from '../src/components/Header'; // adjust path as needed
import UserContext from '../src/utils/UserContext'; // adjust path as needed
import appStore from '../src/utils/appStore'; // adjust path as needed

test('renders About Us text in Header', () => {
  render(
    <Provider store={appStore}>
        <UserContext.Provider value={""}>
    <MemoryRouter>
      <Header />
    </MemoryRouter>
        </UserContext.Provider>
    </Provider>

  );

  // Example check for "About Us" text on the screen
  const aboutText = screen.getByText("About Us");
  expect(aboutText).toBeInTheDocument();
});


function add(a, b) {
  return a + b;
}

test('adds 2 + 3 to equal 5', () => {
  expect(add(2, 3)).toBe(5);
});