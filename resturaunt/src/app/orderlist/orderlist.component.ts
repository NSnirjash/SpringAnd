import { Component, OnInit } from '@angular/core';
import { OrderModel } from '../model/order.model';
import { User } from '../model/user.model';
import { AuthService } from '../service/auth.service';
import { OrderService } from '../service/order.service';
import { Role } from '../model/Role.model';
import { BillService } from '../service/bill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  orderList: OrderModel[] = [];
  waiterList: User[] = []; // List of waiters
  user: User | null | undefined; // Current user
  selectedWaiters: { [orderId: number]: number } = {}; // Selected waiter IDs by order ID

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private billService: BillService, // Inject BillService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser();
    this.loadOrderList();
    if (this.isAdmin()) {
      this.loadUsers(); // Load waiters only if user is an ADMIN
    }
  }

  // Fetches the orders for the logged-in user
  loadOrderList(): void {
    if (this.user) {
      this.orderService.getAllOrders(this.user.id).subscribe((orders) => {
        this.orderList = orders;
      });
    }
  }

  // Load all waiters for the dropdown
  loadUsers(): void {
    this.authService.getAllWaiters().subscribe((waiters) => {
      this.waiterList = waiters;
    });
  }

  // Checks if the current user is an ADMIN
  isAdmin(): boolean {
    return this.user?.role.toString() === 'ADMIN';
  }

  isApproved(order: OrderModel): boolean {
    return order.status === 'APPROVED' || order.status === 'REJECTED';
  }
  

  // Approve order with the selected waiter
  approveOrder(orderId: number): void {
    const selectedWaiterId = this.selectedWaiters[orderId];
    if (!selectedWaiterId) {
      alert('Please select a waiter before approving the order.');
      return;
    }

    this.orderService.approveOrder(orderId, this.user?.id!, selectedWaiterId).subscribe((order) => {
      this.loadOrderList();
      alert('Order approved');
    });
  }

  // Reject order
  rejectOrder(orderId: number): void {
    this.orderService.rejectOrder(orderId, this.user?.id!).subscribe(() => {
      this.loadOrderList();
      alert('Order rejected');
    });
  }

  // Calculate the total quantity of items in an order
  getTotalQuantity(order: OrderModel): number {
    return order.orderItems.reduce((total, item) => total + (item.quantity || 0), 0);
  }

   // Create bill for an approved order
   createBill(orderId: number): void {
    if (this.user && this.isAdmin()) {
      this.billService.createBill(orderId, this.user.id).subscribe(
        (bill) => {
          alert(`Bill created successfully with ID: ${bill.id}`);
          this.loadOrderList(); // Reload orders to reflect changes
        },
        (error) => {
          console.error('Error creating bill:', error);
          alert('Failed to create bill. Please try again.');
        }
      );
    } else {
      alert('Only admins can create bills.');
    }
  }

  payBill(billId: number): void {
    this.billService.payBill(billId).subscribe(
      (bill) => {
        alert(`Bill paid successfully. Status changed to GIVEN.`);
        this.loadOrderList();
      },
      (error) => {
        console.error('Error paying bill:', error);
        alert('Failed to pay bill. Please try again.');
      }
    );
  }

  // Confirm the bill
  confirmBill(billId: number): void {
    if (this.user && this.isAdmin()) {
      this.billService.confirmBill(billId, this.user.id).subscribe(
        (bill) => {
          alert(`Bill confirmed successfully. Status changed to PAID.`);
          this.loadOrderList();
          this.router.navigate(['/bill', bill.id]);
        },
        (error) => {
          console.error('Error confirming bill:', error);
          alert('Failed to confirm bill. Please try again.');
        }
      );
    }
  }


  // Navigate to bill details page
  viewBillDetails(billId: number): void {
    this.router.navigate(['/bill-details', billId]);
  }
}
