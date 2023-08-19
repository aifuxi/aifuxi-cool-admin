import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ROUTE_PATH } from '@/constants/path';
import Home from '@/pages/home/home';
import Login from '@/pages/login/login';

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.HOME,
    element: <Home />,
  },
  {
    path: ROUTE_PATH.LOGIN,
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
