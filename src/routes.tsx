import { createBrowserRouter, Navigate } from 'react-router-dom';
import SalesPersonView from './components/SalesPerson/SalesPersonView.tsx';
import AdminView from "./components/Admin/AdminView.tsx";
import TicketSale from "./components/SalesPerson/Sale/TicketSale.tsx";
import TicketCheck from "./components/SalesPerson/Ticket/TicketCheck.tsx";
import NotFound from "./components/utils/RouteError.tsx";
import LoginView from './components/Login/Login.tsx';
import ProtectedRoute from './components/Login/ProtectedRoute.tsx';
import AuthError from './components/utils/AuthError.tsx';

// Define routes using createBrowserRouter
const routes = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to='/login' replace />
    },
    {
        path: '/login',
        element: <LoginView />,
    },
    {
        path: '/user',
        element: (
            <ProtectedRoute roles={['ADMIN','USER']}>
                 <SalesPersonView />
            </ProtectedRoute>
        ),
    },
    {
        path: '/check',
        element: (
            <ProtectedRoute roles={['ADMIN','USER']}>
                 <TicketCheck />
            </ProtectedRoute>
        ),
    },
    {
        path: '/sales',
        element: (
            <ProtectedRoute roles={['ADMIN','USER']}>
                 <TicketSale />
            </ProtectedRoute>
        ),
    },
    {
        path: '/admin',
        element: (
            <ProtectedRoute roles={['ADMIN']}>
                <AdminView />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <NotFound />,
    },
    {
        path: '/unauthorized',
        element: <AuthError />,
    },
]);

export default routes;