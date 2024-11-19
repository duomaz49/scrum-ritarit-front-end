import './loading.css'
import {useLoading} from "../../context/LoadingContext.tsx";

export default function LoadingSpinner() {
    const { isLoading } = useLoading();
    if (!isLoading) return null;

    return (
        <div className="app-loading">
            <div className="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}