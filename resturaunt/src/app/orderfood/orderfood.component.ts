import { Component, OnInit } from '@angular/core';
import { FoodModel } from '../model/food.model';
import { FoodService } from '../service/food.service';
import { OrderService } from '../service/order.service';
import { Router } from '@angular/router';
import { OrderModel } from '../model/order.model';
import { AuthService } from '../service/auth.service';
import { OrderItemModel } from '../model/orderdetails.model';

@Component({
  selector: 'app-orderfood',
  templateUrl: './orderfood.component.html',
  styleUrls: ['./orderfood.component.css'] // Corrected the property name
})
export class OrderfoodComponent implements OnInit {

  order: OrderModel = new OrderModel(); // To save the order
  foodList: FoodModel[] = []; // To store available food items
  orderItems: OrderItemModel[] = []; // To store selected food items with quantities

  constructor(
    private foodService: FoodService,
    private orderService: OrderService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadFoods();
    const user = this.authService.getUser(); // Assuming getUser() returns the current user
    if (user) {
      this.order.user = user; // Set the user in the order
    }
  }

  loadFoods(): void {
    this.foodService.getAllFood().subscribe((foods) => {
      this.foodList = foods;
    });
  }

  // Increment quantity for a food item
  incrementQuantity(food: FoodModel): void {
    let orderItem = this.orderItems.find(item => item.food?.id === food.id);

    if (!orderItem) {
      orderItem = new OrderItemModel();
      orderItem.food = food;
      orderItem.quantity = 1;
      this.orderItems.push(orderItem);
    } else {
      orderItem.quantity! += 1;
    }

    this.updateOrder();
  }

  // Decrement quantity for a food item
  decrementQuantity(food: FoodModel): void {
    const orderItem = this.orderItems.find(item => item.food?.id === food.id);

    if (orderItem) {
      if (orderItem.quantity! > 1) {
        orderItem.quantity! -= 1;
      } else {
        this.orderItems = this.orderItems.filter(item => item.food?.id !== food.id);
      }

      this.updateOrder();
    }
  }

  // Update the order with the current order items
  private updateOrder(): void {
    this.order.orderItems = this.orderItems;
    this.order.totalPrice = this.orderItems.reduce((sum, item) => {
      return sum + (item.food?.price || 0) * (item.quantity || 0);
    }, 0);
  }

  // Save the order (navigate or send to backend)
  placeOrder(): void {
    //console.log(this.order);
    this.orderService.createOrder(this.order).subscribe((response) => {
      console.log('Order placed successfully!', response);
      this.router.navigate(['/orderlist']); // Redirect after placing order
    });
  }

  isFoodSelected(foodId: number): boolean {
    return !!this.orderItems.find(item => item.food?.id === foodId);
  }

  getFoodQuantity(foodId: number): number {
    const orderItem = this.orderItems.find(item => item.food?.id === foodId);
    return orderItem?.quantity || 0;
  }
  
}
