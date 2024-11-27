import axios, { AxiosRequestConfig } from "axios";
import {BASE_URL, BASE_URL_LOCALHOST, ENDPOINTS} from './constants';
import { getBasicAuthHeader } from "./utils";

const apiUrlTickets = `${BASE_URL}${ENDPOINTS.TICKETS}`;
const apiUrlEvents = `${BASE_URL}${ENDPOINTS.EVENTS}`;
const apiUrlSales = `${BASE_URL}${ENDPOINTS.SALES}`;
const apiUrlPaymentMethods = `${BASE_URL}${ENDPOINTS.PAYMENT_METHODS}`;

export const getEvents = (setEvents) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': sessionStorage.getItem('authHeader')
        }
    };
    axios.get(`${apiUrlEvents}`, config)
        .then(response => {
            setEvents(response.data);
        })
        .catch(error => {
            alert("No events found! Please contact the administrator.");
            console.error("Error fetching tickets:", error);
        });
}

export const getTicket = (ticketNumber, setTicket, toggleConfirm, toggleUndo) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': sessionStorage.getItem('authHeader')
        }
    };
    axios.get(`${apiUrlTickets}/${ticketNumber}`, config)
        .then(response => {
            setTicket(response.data);
            response.data.used ? toggleUndo() : toggleConfirm();
        })
        .catch(error => {
            alert("Ticket not found, please check the ticket number and try again.");
            console.error("Error fetching tickets:", error);
        });
}

export const markTicketUsed = (ticketNumber, setUsedModal) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': sessionStorage.getItem('authHeader')
        }
    };
    axios.put(`${apiUrlTickets}/${ticketNumber}/use`, {}, config)
        .then(() => {
            setUsedModal(false);
        })
        .catch(error => {
            console.error("Error marking ticket as used:", error);
        });
};

export const markTicketUnused = (ticketNumber, setUnUsedModal) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': sessionStorage.getItem('authHeader')
        }
    };
    axios.put(`${apiUrlTickets}/${ticketNumber}/use?used=false`, {}, config)
        .then(() => {
            setUnUsedModal(false);
        })
        .catch(error => {
            console.error("Error undoing ticket usage:", error);
        });
}

export const sellTicket = (saleData, setSuccesfulSale, setProofOfSaleModal) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': sessionStorage.getItem('authHeader')
        }
    };
    axios.post(`${apiUrlSales}`, saleData, config)
        .then(response => {
            setSuccesfulSale(response.data);
            setTimeout(() => {
                setProofOfSaleModal(true);
            },500);
        })
        .catch(error => {
            console.error("Error selling ticket:", error);
            alert("Error selling ticket, please try again.");
        });
}

export const getPaymentMethods = (setPaymentMethods) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': sessionStorage.getItem('authHeader')
        }
    };
    axios.get(`${apiUrlPaymentMethods}`, config)
        .then(response => {
            setPaymentMethods(response.data);
        })
        .catch(error => {
            alert("No payment methods found! Please contact the administrator.");
            console.error("Error fetching tickets:", error);
        });
}