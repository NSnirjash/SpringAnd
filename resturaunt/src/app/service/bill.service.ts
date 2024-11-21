import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { BillModel } from '../model/bill.model';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  private apiUrl = 'http://localhost:8090/api/bills';


  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  createBill(orderId: number, adminId: number): Observable<BillModel> {
    const headers = this.getAuthHeaders();
    return this.http
      .post<BillModel>(
        `${this.apiUrl}/create`,
        {},
        { headers, params: { orderId: orderId.toString(), adminId: adminId.toString() } }
      )
      .pipe(catchError(this.handleError));
  }

  payBill(billId: number): Observable<BillModel> {
    const headers = this.getAuthHeaders();
    return this.http
      .put<BillModel>(`${this.apiUrl}/pay/${billId}`, {}, { headers })
      .pipe(catchError(this.handleError));
  }

  confirmBill(billId: number, adminId: number): Observable<BillModel> {
    const headers = this.getAuthHeaders();
    return this.http
      .put<BillModel>(
        `${this.apiUrl}/confirm/${billId}`,
        {},
        { headers, params: { adminId: adminId.toString() } }
      )
      .pipe(catchError(this.handleError));
  }

  getBillById(billId: number): Observable<BillModel> {
    const headers = this.getAuthHeaders();
    return this.http
      .get<BillModel>(`${this.apiUrl}/${billId}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // Handle HTTP errors
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
