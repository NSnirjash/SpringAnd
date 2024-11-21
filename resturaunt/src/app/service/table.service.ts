import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { TableModel } from '../model/table.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  private apiUrl = 'http://localhost:8090/api/table';

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject AuthService to retrieve the token
  ) { }

  // Get all TableModel
  getAllTable(): Observable<TableModel[]> {
    return this.http.get<TableModel[]>(`${this.apiUrl}/view`)
    .pipe(
      catchError(this.handleError)
    );
  }

  // Save a new table
  saveTable(table: TableModel): Observable<TableModel> {

    return this.http.post<TableModel>(`${this.apiUrl}/save`, table)
      .pipe(
        catchError(this.handleError)
      );   
  }

  // Delete a table by ID
  deleteTable(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`)
    .pipe(
      catchError(this.handleError)
    );;
  }

  // Update a table
  // updateTable(id: number, table: TableModel): Observable<string> {
  //   return this.http.put<string>(`${this.apiUrl}/update/${id}`, table, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   });
  // }

  updateTable(table: TableModel, id: number): Observable<TableModel> {
    return this.http.put<TableModel>(`${this.apiUrl}/update?id=${id}`, table)
    .pipe(
      catchError(this.handleError)
    );; // Ensure you're passing the correct parameters
  }

  // Find a table by ID
  findTableById(id: number): Observable<TableModel> {
    return this.http.get<TableModel>(`${this.apiUrl}/view/${id}`)
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
