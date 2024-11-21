import { OrderModel } from "./order.model";
import { User } from "./user.model";

export class ApproveOrder {
    id!: number;
    approvalStatus!: string; // APPROVED, REJECTED
    order!: OrderModel; // Associated Order
    admin!: User; // Admin who approves the order
    staff!: User | null; // Staff who serves the food, can be null
    approved!: boolean;
    served!: boolean;
    notes?: string; // Optional notes
}