import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NiceModal from '@ebay/nice-modal-react';

import { ROUTE_PATH } from '@/constants/path';
import Home from '@/pages/home/home';
import Login from '@/pages/login/login';

import MainLayout from './components/layout/main-layout';
import ArticlePage from './pages/article/article';
import ArticleCreatePage from './pages/article/article-create';
import TagPage from './pages/tag/tag';
import UserPage from './pages/user/user';

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
        element: <TagPage />,
      },
      {
        path: ROUTE_PATH.ARTICLE_LIST,
        element: <ArticlePage />,
      },
      {
        path: ROUTE_PATH.ARTICLE_CREATE,
        element: <ArticleCreatePage />,
      },
      {
        path: `${ROUTE_PATH.ARTICLE_CREATE}/:id`,
        element: <ArticleCreatePage />,
      },
      {
        path: ROUTE_PATH.USER,
        element: <UserPage />,
      },
    ],
  },
]);

function App() {
  return (
    <NiceModal.Provider>
      <RouterProvider router={router} />
    </NiceModal.Provider>
  );
}

export default App;
