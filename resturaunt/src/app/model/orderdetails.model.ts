import { FoodModel } from "./food.model";

export class OrderItemModel {

    id!: number;
    quantity?: number;
    food?: FoodModel = new FoodModel();

}