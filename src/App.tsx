import './App.css'
import React, {useEffect} from 'react';
import {LoadingProvider, useLoading} from './context/LoadingContext';
import {setupAxiosInterceptors} from './axios/axiosSetup';
import LoadingSpinner from "./components/utils/LoadingSpinner.tsx";
import EventStatistics from "./components/Admin/Event/EventStatistics.tsx";

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
            <EventStatistics/>
        </LoadingProvider>
    )
}

export default App
