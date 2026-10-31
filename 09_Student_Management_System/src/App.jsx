import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './routes/MainLayout';
import Error from './ui/Error';
import { lazy, Suspense } from 'react';
import Loading from './ui/Loading';

const Student = lazy(() => import('./components/Student'));
const StudentForm = lazy(() => import('./components/StudentForm'));
const StudentProfile = lazy(() => import('./components/StudentProfile'));

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Student />,
        },
        {
          path: 'add',
          element: <StudentForm />,
        },
        {
          path: 'edit/:id',
          element: <StudentForm />,
        },
        {
          path: 'student/:id',
          element: <StudentProfile />,
        },
      ],
    },
  ]);

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default App;
