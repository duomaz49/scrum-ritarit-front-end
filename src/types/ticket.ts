export interface ITicket {
    ticketId?: number;
    eventId?: number;
    saleId?: number;
    ticketTypeId?: number;
    ticketNumber?: string;
    quantity?: number;
    price?: number;
    saleTimestamp?: string;
    used?: boolean;
    usedTimestamp?: string;
}

export const defaultValue: Readonly<ITicket> = {};