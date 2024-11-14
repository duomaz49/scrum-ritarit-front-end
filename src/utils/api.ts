import axios, { AxiosRequestConfig } from "axios";
import {BASE_URL_LOCALHOST, ENDPOINTS} from './constants';
import { getBasicAuthHeader } from "./utils";

const apiUrlTickets = `${BASE_URL_LOCALHOST}${ENDPOINTS.TICKETS}`;
const username = 'john_doe';
const password = 'password123';

export const getTickets = (setTickets) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': getBasicAuthHeader(username, password),
        }
    };
    axios.get(apiUrlTickets, config)
        .then(response => {
            setTickets(response.data);
        })
        .catch(error => {
            console.error("Error fetching tickets:", error);
        });
}

export const markTicketUsed = (selectedTicketId, setTickets, setUsedModal) => {
    if (!selectedTicketId) {
        alert("Ticket ID is missing");
        return;
    }
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': getBasicAuthHeader(username, password),
        }
    };
    axios.put(`${apiUrlTickets}/id/${selectedTicketId}/use`, {}, config)
        .then(() => {
            getTickets(setTickets);
            setUsedModal(false);
        })
        .catch(error => {
            console.error("Error marking ticket as used:", error);
        });
};

export const markTicketUnused = (selectedTicketId, setTickets, setUnUsedModal) => {
    if (!selectedTicketId) {
        alert("Ticket ID is missing");
        return;
    }
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': getBasicAuthHeader(username, password),
        }
    };
    axios.put(`${apiUrlTickets}/id/${selectedTicketId}/use?used=false`, {}, config)
        .then(() => {
            getTickets(setTickets);
            setUnUsedModal(false);
        })
        .catch(error => {
            console.error("Error undoing ticket usage:", error);
        });
};