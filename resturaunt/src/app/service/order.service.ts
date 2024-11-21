import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderModel } from '../model/order.model';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8090/api/order';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  // Get Bearer token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log(token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // createOrder(order: OrderModel): Observable<OrderModel> {

  //   const token = this.authService.getToken();
  //   console.log('Token:', token); // Verify token
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //     // 'Content-Type' is not needed here
  //   });
  //   console.log(headers);
  //   return this.http.post<OrderModel>(`${this.apiUrl}/create`, order, { headers })
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }


  createOrder(order: OrderModel): Observable<OrderModel> {
    const token = this.authService.getToken();
    console.log('Token:', token); // Check if token is valid
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // Ensure this is correct
    });
    console.log('Headers:', headers); // Debugging the headers
    console.log(order); // Debugging the headers
  
    
    return this.http.post<OrderModel>(`${this.apiUrl}/create`, order, { headers })
      .pipe(
        catchError(this.handleError)  // Log full error details
      );
  }
  

  

  getAllOrders(userId: number): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(`${this.apiUrl}/all?userId=${userId}`);
  }

  getOrdersByUserId(userId: number): Observable<OrderModel[]> {
    return this.http.get<OrderModel[]>(`${this.apiUrl}/user/${userId}`);
  }

  getOrderById(id: number): Observable<OrderModel> {
    return this.http.get<OrderModel>(`${this.apiUrl}/${id}`);
  }

  updateOrderStatus(id: number, status: string): Observable<OrderModel> {
    const headers = this.getAuthHeaders();
    return this.http.put<OrderModel>(`${this.apiUrl}/update/${id}?status=${status}`, {}, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  approveOrder(id: number, adminId: number, staffId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.put<void>(`${this.apiUrl}/approve/${id}?adminId=${adminId}&staffId=${staffId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }


  createOrderDetailsWithOrders(orderDetails: any, orders: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, { orderDetails, orders });
 }

  getAllOrderDetails(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/view`);
}

getOrderDetailsById(id: number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/getOrderDetailsById/${id}`);

}

  serveOrder(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  rejectOrder(id: number, adminId: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/reject/${id}?adminId=${adminId}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteOrder(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('HTTP Error: ', error); // Log full error details
  
    if (error.status === 403) {
      console.error('403 Forbidden: Access denied. Check the token or user permissions.');
    } else if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      console.error('A client-side error occurred:', error.error.message);
    } else {
      // Backend returned an unsuccessful response code
      console.error(`Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
  
}
