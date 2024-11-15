import {IEventTicketType} from "./eventTicketType.ts";

export interface IEvent {
    eventId?: number;
    userId?: number;
    eventName?: string;
    eventDate?: string;
    location?: string;
    totalTickets?: number;
    availableTickets?: number;
    eventTicketTypes?: IEventTicketType[];
}