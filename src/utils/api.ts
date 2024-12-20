import axios, {AxiosRequestConfig} from "axios";
import {BASE_URL, BASE_URL_LOCALHOST, ENDPOINTS} from './constants';

const apiUrlTickets = `${BASE_URL}${ENDPOINTS.TICKETS}`;
const apiUrlEvents = `${BASE_URL}${ENDPOINTS.EVENTS}`;
const apiUrlSales = `${BASE_URL}${ENDPOINTS.SALES}`;
const apiUrlPaymentMethods = `${BASE_URL}${ENDPOINTS.PAYMENT_METHODS}`;
const apiUrlTicketTypes = `${BASE_URL}${ENDPOINTS.TICKET_TYPES}`;
const apiUrlUsers = `${BASE_URL}${ENDPOINTS.USERS}`;

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
            }, 500);
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
            console.error("Error fetching payment methods:", error);
        });
}

export const getTicketTypes = (setTicketTypes) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': sessionStorage.getItem('authHeader')
        }
    };
    axios.get(`${apiUrlTicketTypes}`, config)
        .then(response => {
            setTicketTypes(response.data);
        })
        .catch(error => {
            alert("No ticket types found! Please contact the administrator.");
            console.error("Error fetching ticket types:", error);
        });
}

export const createEvent = (eventData, toggleEventModal) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': sessionStorage.getItem('authHeader')
        }
    };
    axios.post(`${apiUrlEvents}`, eventData, config)
        .then(response => {
            setTimeout(() => {
                toggleEventModal();
            }, 500);
        })
        .catch(error => {
            console.error("Error creating event:", error);
            alert("Error creating event, please try again.");
        });
}

export const editEvent = (eventData, toggleEventModal) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': sessionStorage.getItem('authHeader')
        }
    };
    axios.put(`${apiUrlEvents}/${eventData.eventId}`, eventData, config)
        .then(response => {
            setTimeout(() => {
                toggleEventModal();
            }, 500);
        })
        .catch(error => {
            console.error("Error editing event:", error);
            alert("Error editing event, please try again.");
        });
}

export const getEventSummary = (eventId, callback) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': sessionStorage.getItem('authHeader')
        }
    };
    axios.get(`${apiUrlEvents}/${eventId}${ENDPOINTS.SUMMARIES}`, config)
        .then((response) => {
            console.log("Event summary:", response.data);
            callback(response.data)
        })
        .catch((error) => {
            console.error("Error fetching event summary:", error);
            alert("No data found. Please contact the administrator.");
        });
}

export const deleteEvent = (eventId, toggleDeleteModal) => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': sessionStorage.getItem('authHeader')
        }
    };
    axios.delete(`${apiUrlEvents}/${eventId}`, config)
        .then(response => {
            setTimeout(() => {
                toggleDeleteModal();
            }, 500);
        })
        .catch(error => {
            console.error("Error deleting event:", error);
            alert("Error deleting event, please try again.");
        });
}

export const createAppUser = (newUser, toggleUserModal) => {
    const config = {
        headers: {
            'Authorization': sessionStorage.getItem('authHeader'),
        },
    };
    const userData = {
        username: newUser.username,
        passwordHash: newUser.password,
        roleId: newUser.roleId,
    };

    return axios.post(`${apiUrlUsers}`, userData, config)
        .then((response) => {
            setTimeout(() => {
                toggleUserModal();
            }, 500);
            alert("New user added successfully")
            return response.data;
        })
        .catch(error => {
            throw new Error("This username is already taken");
        });
};
