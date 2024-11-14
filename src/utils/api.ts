import axios, { AxiosRequestConfig } from "axios";
import {BASE_URL_LOCALHOST, ENDPOINTS} from './constants';
import { getBasicAuthHeader } from "./utils";

const apiUrlTickets = `${BASE_URL_LOCALHOST}${ENDPOINTS.TICKETS}`;
const username = 'john_doe';
const password = 'password123';

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