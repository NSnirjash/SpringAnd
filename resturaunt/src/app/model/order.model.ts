import { BillModel } from "./bill.model";
import { OrderItemModel } from "./orderdetails.model";
import { User } from "./user.model";

export class OrderModel {
    id!: number;
    user: User = new User();
    orderItems: OrderItemModel[] = [];
    status!: string;
    totalPrice!: number;
    admin?: User;
    staff?: User;
    notes?: string;
    bill?: BillModel;
}
