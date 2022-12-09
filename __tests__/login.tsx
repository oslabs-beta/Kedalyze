import React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import LoginPage from '../src/client/components/login/LoginPage'

// describe('LoginPage', () => {
//   test('it navigates to the dashboard page and displays a success message when the user submits the form with correct credentials', async () => {
//     // Arrange
//     const fakeFetch = jest.fn().mockResolvedValue({ status: 200 });
//     global.fetch = fakeFetch as any;
//     const navigate = jest.fn();
//     const { getByLabelText, getByText } = render(<LoginPage />);
//     const usernameInput = getByLabelText('Username:') as HTMLInputElement;
//     const passwordInput = getByLabelText('Password:') as HTMLInputElement;
//     const loginButton = getByText('Login') as HTMLButtonElement;

//     // Act
//     fireEvent.change(usernameInput, { target: { value: 'test-user' } });
//     fireEvent.change(passwordInput, { target: { value: 'test-password' } });
//     fireEvent.click(loginButton);

//     // Assert
//     expect(fakeFetch).toHaveBeenCalledWith(
//       'http://localhost:3000/login',
//       expect.objectContaining({
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: expect.stringContaining('test-user'),
//       })
//     );
//     expect(navigate).toHaveBeenCalledWith('/dashboard');
//     expect(getByText('Successful login!')).toBeInTheDocument();
//   });

//   test('it displays an error message when the user submits the form with incorrect credentials', async () => {
//     // Arrange
//     const fakeFetch = jest.fn().mockResolvedValue({ status: 401 });
//     global.fetch = fakeFetch as any;
//     const navigate = jest.fn();
//     const { getByLabelText, getByText } = render(<LoginPage />);
//     const usernameInput = getByLabelText('Username:') as HTMLInputElement;
//     const passwordInput = getByLabelText('Password:') as HTMLInputElement;
//     const loginButton = getByText('Login') as HTMLButtonElement;

//     // Act
//     fireEvent.change(usernameInput, { target: { value: 'test-user' } });
//     fireEvent.change(passwordInput, { target: { value: 'test-password' } });
//     fireEvent.click(loginButton);

//     // Assert
//     expect(fakeFetch).toHaveBeenCalledWith(
//       'http://localhost:3000/login',
//       expect.objectContaining({
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: expect.stringContaining('test-user'),
//       })
//     );
//     expect(navigate).toHaveBeenCalledWith('/login');
//     expect(getByText('Wrong username/password, Please try again')).toBeInTheDocument();
//   });
// });

describe("Test the Login Component", () => {
  test("render the login form submit button on the screen", async () => {
    render(<LoginPage />);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(2);
  });

});