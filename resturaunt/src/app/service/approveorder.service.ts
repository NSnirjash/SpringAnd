import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApproveOrder } from '../model/orderapprove.model';
import { Observable } from 'rxjs';
import { OrderModel } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class ApproveorderService {
  private baseUrl = 'http://localhost:8090/api/approveorders';
  private orderAPI = 'http://localhost:8090/api/orders';

  constructor(private http: HttpClient) { }

  // Approve an order
  approveOrder(orderId: number, adminId: number, staffId: number): Observable<ApproveOrder> {
    return this.http.put<ApproveOrder>(`${this.baseUrl}/approve/${orderId}`, null, {
        params: {
            adminId: adminId.toString(),
            staffId: staffId.toString(),
        },
    });
}

// Get all approved orders
getAllOrders(): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(`${this.orderAPI}/all`);
}

// Get all approved orders
getAllApprovedOrders(): Observable<ApproveOrder[]> {
    return this.http.get<ApproveOrder[]>(`${this.baseUrl}/all`);
}

// Serve an order
serveOrder(orderId: number, staffId: number): Observable<ApproveOrder> {
    return this.http.put<ApproveOrder>(`${this.baseUrl}/serve/${orderId}`, null, {
        params: {
            staffId: staffId.toString(),
        },
    });
}
}
