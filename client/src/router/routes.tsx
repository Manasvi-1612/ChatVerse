import { lazy } from 'react';
import Home from '../pages/Home';
import RequireAuth from '../components/RequireAuth';
const Signup = lazy(() => import('../pages/Signup'));
const Login = lazy(() => import('../pages/Login'));
const SecureComponent = lazy(() => import('../pages/SecureComponent'));


const routes = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/signup',
        element: <Signup />,
    },
    {
        path: '/secure',
        element: <RequireAuth fallbackPath={'/'} children={<SecureComponent />} />
    }
]

export { routes }