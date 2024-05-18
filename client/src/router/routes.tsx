import { lazy } from 'react';
import SecureComponent from '../pages/SecureComponent';
import RequireAuth from '../components/RequireAuth';
const Signup = lazy(() => import('../pages/Signup'));
const Login = lazy(() => import('../pages/Login'));


const routes = [
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/secure',
        element: <RequireAuth fallbackPath={'/'} children={<SecureComponent />}  />
    }
]

export { routes }