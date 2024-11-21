import { Component } from '@angular/core';
import { ApproveOrder } from '../model/orderapprove.model';
import { ApproveorderService } from '../service/approveorder.service';
import { OrderModel } from '../model/order.model';
import { AuthService } from '../service/auth.service';
import { OrderService } from '../service/order.service';
import { User } from '../model/user.model';
import { privateDecrypt } from 'node:crypto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-approveorder',
  templateUrl: './approveorder.component.html',
  styleUrl: './approveorder.component.css'
})
export class ApproveorderComponent {

  orders: OrderModel[] = [];
  waiters: User[] = [];
  filterStatus: string = 'all';
  errorMessage: string = '';

  constructor(private orderService: OrderService,
    private authService: AuthService,
    private router:Router
  

  ) {}

  ngOnInit(): void {
    // this.loadAllOrders();
    this.loadAllWaiters();
  }

  loadAllWaiters(): void {
    this.authService.getAllWaiters().subscribe(
      (waiters) => { 
        this.waiters = waiters;
        console.log(this.waiters)
      },
      (error) => {
        console.error('Error loading waiters', error);
      }
    );
  }

  // loadAllOrders(): void {
  //   this.orderService.getAllOrders().subscribe(
  //     (orders) => {
  //       this.orders = orders;
  //     },
  //     (error) => {
  //       console.error('Error loading approved orders', error);
  //     }
  //   );
  // }

  loadAllOrderDetails(): void {
    // this.orderService.getAllOrderDetails().subscribe(
    //   (data: any) => {
    //     this.orderDetailsList = data;
    //   },
    //   (error: any) => {
    //     this.errorMessage = 'Error fetching order details';
    //     console.error(error);
    //   }
    // );
  }

  approveOrder(order: OrderModel): void {
    let user = this.authService.getUser();
    if (user) {
      this.orderService.approveOrder(order.id, user.id, order.staff ? order.staff.id : 0).subscribe(
        (updatedOrder) => {
          console.log('Order approved:', updatedOrder);
          this.router.navigate(['orderapprove']).then(() => {
            window.location.reload();
          });
        },
        (error) => {
          console.error('Error approving order', error);
        }
      );
    }
  }

  rejectOrder(order: OrderModel): void {
    let user = this.authService.getUser();
    if (user) {
      this.orderService.rejectOrder(order.id, user.id).subscribe(
        (updatedOrder) => {
          console.log('Order rejected:', updatedOrder);
        },
        (error) => {
          console.error('Error rejecting order', error);
        }
      );
    }
  }

}
