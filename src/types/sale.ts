import {ITicket} from "./ticket.ts";

export interface ISale {
    paymentMethod?: string;
    saleId?: number;
    saleTimestamp?: string;
    tickets?: ITicket[];
    totalPrice?: number;
    userId?: number;
}