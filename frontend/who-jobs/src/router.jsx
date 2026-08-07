import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import NotFoundPage from './Pages/NotFoundPage';
import RegisterPage from './Pages/RegisterPage';
import LoginPage from './Pages/LoginPage';
import Layout from './layouts/Layout';
import HomePage from './Pages/HomePage';

export const router = createBrowserRouter([
  {
    // path: '/',
    element: <Layout/>,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/home",
        element: <HomePage/>
      }
    ]
  },
  {
    path: "/",
    element: <LandingPage/>
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <LoginPage/>
  },
  
  

]);