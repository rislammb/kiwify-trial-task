import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Error from './pages/Error';
import Login from './pages/Login';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <div class='sm:mx-auto sm:w-full sm:max-w-md'>Home</div>,
    errorElement: <Error />,
  },
]);

const App = () => {
  return (
    <div id='__layout'>
      <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
