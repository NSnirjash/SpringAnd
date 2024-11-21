import { OrderModel } from "./order.model";
import { User } from "./user.model";

export class BillModel {
    id!: number;                // Unique identifier for the bill
    totalAmount!: number;        // Total amount of the bill
    billDate!: Date;             // Date when the bill was generated
    paymentMethod?: string;      // Payment method used (Cash, Card)
    status!: string;             // Status of the bill (PAID, UNPAID, CANCELLED)
    paidBy!: User;               // User who made the payment
    receivedBy?: User;           // Admin who received the payment (optional)
    order: OrderModel = new OrderModel(); // Associated OrderDetails for this bill

}

