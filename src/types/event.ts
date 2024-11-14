import {ITicketType} from "./tickettype.ts";

export interface IEvent {
    eventId?: number;
    userId?: number;
    eventName?: string;
    eventDate?: string;
    location?: string;
    totalTickets?: number;
    availableTickets?: number;
    ticketTypes?: ITicketType[];
}