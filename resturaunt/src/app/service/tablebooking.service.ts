import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TableBooking } from '../model/tablebooking.model';
import { catchError, Observable, throwError } from 'rxjs';
import { TableModel } from '../model/table.model';
import { AuthService } from './auth.service';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class TablebookingService {

  private apiUrl = 'http://localhost:8090/api/bookings';
  private apiUrl2 = 'http://localhost:8090/api/approvals';

  constructor(
    private http: HttpClient,
    private authService: AuthService) { } // Inject AuthService to retrieve the token

  // Get Bearer token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    console.log(token);
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // Fetch all table bookings
  getAllTables(): Observable<TableModel[]> {

    return this.http.get<TableModel[]>('http://localhost:8090/api/tables/view');
  }

  // Get all bookings
  getAllBookings(): Observable<TableBooking[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<TableBooking[]>(`${this.apiUrl}/allbooking`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Fetch a single booking by ID
  getBookingById(id: number): Observable<TableBooking> {
    const headers = this.getAuthHeaders();
    return this.http.get<TableBooking>(`${this.apiUrl}/${id}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get bookings for a specific user
  getUserBookings(userId: number): Observable<TableBooking[]> {
    return this.http.get<TableBooking[]>(`${this.apiUrl}/user/${userId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Create a new booking
  createBooking(booking: TableBooking): Observable<TableBooking> {
    const token = this.authService.getToken();
    console.log('Token:', token); // Verify token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // 'Content-Type' is not needed here
    });

    console.log(headers);
    return this.http.post<TableBooking>(`${this.apiUrl}/create`, booking, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Update a booking
  updateBooking(bookingId: number, userId: number, tableId: number): Observable<TableBooking> {
    const headers = this.getAuthHeaders();
    return this.http.put<TableBooking>(`${this.apiUrl}/update/${bookingId}?userId=${userId}&tableId=${tableId}`, {}, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Cancel a booking
  cancelBooking(bookingId: number) {

    return this.http.delete(`${this.apiUrl}/cancel/${bookingId}`, { responseType: 'text' });
  }

  // Method to approve a booking
  approveBooking(bookingId: number, adminId: number): Observable<TableBooking> {
    const headers = this.getAuthHeaders();
    return this.http.put<TableBooking>(`${this.apiUrl2}/approve/${bookingId}?adminId=${adminId}`, {}, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Method to reject a booking
  rejectBooking(bookingId: number, adminId: number): Observable<TableBooking> {
    const headers = this.getAuthHeaders();
    return this.http.put<TableBooking>(`${this.apiUrl2}/reject/${bookingId}?adminId=${adminId}`, {}, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Get all pending bookings
  getPendingBookings(): Observable<TableBooking[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<TableBooking[]>(`${this.apiUrl}/pending`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Common error handler
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error(error.message || 'Server Error'));
  }
}
