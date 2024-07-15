import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedRouter from './components/HOCs/ProtectedRouter';
import Layout from './components/Layout';
import MainPage from './components/pages/MainPage';
import SignInPage from './components/pages/SignInPage';
import SignUpPage from './components/pages/SignUpPage';
import TaskPage from './components/pages/TaskPage';
import useUser from './hooks/useUser';

function App() {
  const { logoutHandler, signInHandler, signUpHandler, user } = useUser();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          path: '/',
          element: (
            <ProtectedRouter isAllowed={user.status === 'logged'} redirect="/auth/signin">
              <MainPage  />
            </ProtectedRouter>
          ),
        },
        {
          path: '/my-tasks',
          element: <TaskPage user={user} />,
        },

        {
          element: <ProtectedRouter isAllowed={user.status !== 'logged'} />,
          children: [
            {
              path: '/auth/signup',
              element: <SignUpPage signUpHandler={signUpHandler} />,
            },
            {
              path: '/auth/signin',
              element: <SignInPage signInHandler={signInHandler} />,
            },
          ],
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
