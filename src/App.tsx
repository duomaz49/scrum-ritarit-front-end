import './App.css'
import React, {useEffect} from 'react';
import {LoadingProvider, useLoading} from './context/LoadingContext';
import {setupAxiosInterceptors} from './axios/axiosSetup';
import LoadingSpinner from "./components/utils/LoadingSpinner.tsx";
import routes from "./routes.tsx";
import {RouterProvider} from "react-router-dom";

const AxiosSetup: React.FC = () => {
    const {showLoading, hideLoading} = useLoading();

    useEffect(() => {
        setupAxiosInterceptors(showLoading, hideLoading);
    }, [showLoading, hideLoading]);

    return null;
};

function App() {
    return (
        <LoadingProvider>
            <LoadingSpinner/>
            <AxiosSetup/>
            <RouterProvider router={routes} />
        </LoadingProvider>
    )
}

export default App
