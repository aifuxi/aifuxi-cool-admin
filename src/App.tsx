import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import NiceModal from '@ebay/nice-modal-react';

import { ROUTE_PATH } from '@/constants/path';

import { MainLayout } from './components/layouts';
import { ArticleCreateOrEditPage, ArticlePage } from './features/article';
import { HomePage } from './features/home';
import { LoginPage } from './features/login';
import { TagPage } from './features/tag';
import { UserPage } from './features/user';

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.LOGIN,
    element: <LoginPage />,
  },
  {
    path: ROUTE_PATH.HOME,
    element: <MainLayout />,
    children: [
      {
        path: ROUTE_PATH.HOME,
        element: <HomePage />,
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
        element: <ArticleCreateOrEditPage />,
      },
      {
        path: `${ROUTE_PATH.ARTICLE_CREATE}/:id`,
        element: <ArticleCreateOrEditPage />,
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
