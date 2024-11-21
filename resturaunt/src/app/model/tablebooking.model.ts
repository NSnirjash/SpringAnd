import { TableModel } from "./table.model";
import { User } from "./user.model";

export class TableBooking {
    id!: number;
    status!: string; // PENDING, APPROVED, REJECTED
    approvalDate?: Date;
    bookingDate?: Date;
    bookedBy!: User;   // Relation with User (Customer who booked the table)
    tables!: TableModel; // Relation with Tables
    approvedBy?: User;   // Admin who approved the booking
  }