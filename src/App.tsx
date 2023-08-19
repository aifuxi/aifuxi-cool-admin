import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/path';
import Home from '@/pages/home/home';
import Login from '@/pages/login/login';

import MainLayout from './components/layout/main-layout';
import Tag from './pages/tag/tag';

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.LOGIN,
    element: <Login />,
  },
  {
    path: ROUTE_PATH.HOME,
    element: <MainLayout />,
    children: [
      {
        path: ROUTE_PATH.HOME,
        element: <Home />,
      },
      {
        path: ROUTE_PATH.TAG,
        element: <Tag />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
