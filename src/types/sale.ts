import {ITicket} from "./ticket.ts";
import {IPaymentMethod} from "./paymentMethod.ts";

export interface ISale {
    saleId?: number;
    saleTimestamp?: string;
    tickets?: ITicket[];
    totalPrice?: number;
    userId?: number;
    paymentMethodId?: number;
}