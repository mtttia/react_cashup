import { createBrowserRouter } from "react-router-dom";

import ErrorPage from '../views/error-page';
import HomePage from '../views/home';
import LoginPage from './loginPage';
import Main from './main';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/",
        element: <HomePage />,
      }
    ],
  },
]);