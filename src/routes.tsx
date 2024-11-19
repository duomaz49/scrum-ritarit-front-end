import { createBrowserRouter, Navigate } from 'react-router-dom';
import SalesPersonView from './components/SalesPerson/SalesPersonView.tsx';
import AdminView from "./components/Admin/AdminView.tsx";
import TicketSale from "./components/SalesPerson/Sale/TicketSale.tsx";
import TicketCheck from "./components/SalesPerson/Ticket/TicketCheck.tsx";
import NotFound from "./components/utils/RouteError.tsx";
import LoginView from './components/Login/Login.tsx';

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
        element: <SalesPersonView />
    },
    {
        path: '/check',
        element: <TicketCheck />
    },
    {
        path: '/sales',
        element: <TicketSale />
    },
    {
        path: '/admin',
        element: <AdminView />,
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default routes;