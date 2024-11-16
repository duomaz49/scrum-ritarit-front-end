export interface ITicket {
    ticketId?: number;
    eventId?: number;
    eventName?: string;
    saleId?: number;
    ticketTypeId?: number;
    ticketNumber?: string;
    quantity?: number;
    price?: number;
    saleTimestamp?: string;
    used?: boolean;
    usedTimestamp?: string;
}