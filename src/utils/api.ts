import axios, { AxiosRequestConfig } from "axios";
import {BASE_URL_LOCALHOST, ENDPOINTS} from './constants';
import { getBasicAuthHeader } from "./utils";

const apiUrlTickets = `${BASE_URL_LOCALHOST}${ENDPOINTS.TICKETS}`;
const apiUrlEvents = `${BASE_URL_LOCALHOST}${ENDPOINTS.EVENTS}`;
const apiUrlSales = `${BASE_URL_LOCALHOST}${ENDPOINTS.SALES}`;
const username = 'john_doe';
const password = 'password123';

export const getEvents = (setEvents) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': getBasicAuthHeader(username, password),
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
            'Authorization': getBasicAuthHeader(username, password),
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
            'Authorization': getBasicAuthHeader(username, password),
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
            'Authorization': getBasicAuthHeader(username, password),
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

export const sellTicket = (saleData, setSuccesfulSale, setEventModal, setProofOfSaleModal) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': getBasicAuthHeader(username, password),
        }
    };
    axios.post(`${apiUrlSales}`, saleData, config)
        .then(response => {
            setEventModal(false);
            setSuccesfulSale(response.data);
            setTimeout(() => {
                setProofOfSaleModal(true);
            },500);
        })
        .catch(error => {
            console.error("Error selling ticket:", error);
        });
}