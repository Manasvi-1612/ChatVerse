import { lazy } from 'react';
import Home from '../pages/home';
// import RequireAuth from '../components/RequireAuth';
const Signup = lazy(() => import('../pages/signup'));
const Login = lazy(() => import('../pages/login'));
const Dashboard = lazy(() => import('../pages/dashboard'));


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
        path: '/dashboard',
        element: <Dashboard/>
    }
]

export { routes }