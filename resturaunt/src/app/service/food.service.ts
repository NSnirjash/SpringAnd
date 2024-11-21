import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodModel } from '../model/food.model';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private apiUrl = 'http://localhost:8090/api/food';

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

  // Fetch all food items
  getAllFood(): Observable<FoodModel[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<FoodModel[]>(`${this.apiUrl}/view`)
    .pipe(
      catchError(this.handleError)
    );
  }

  // Add new food with image
  saveFood(food: FoodModel, imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('food', new Blob([JSON.stringify(food)], { type: 'application/json' }));
    formData.append('image', imageFile);

    const token = this.authService.getToken();
    console.log('Token:', token); // Verify token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      // 'Content-Type' is not needed here
    });

    console.log(headers);

    return this.http.post(`${this.apiUrl}/save`, formData, { headers })
    .pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing food item
  updateFood(food: FoodModel): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/update/${food.id}`, { headers })
    .pipe(
      catchError(this.handleError)
    );
  }

  // Delete a food item by ID
  deleteFood(id: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers })
    .pipe(
      catchError(this.handleError)
    );
  }

  // Fetch food by ID
  findFoodById(id: number): Observable<FoodModel> {
    const headers = this.getAuthHeaders();
    return this.http.get<FoodModel>(`${this.apiUrl}/find/${id}`, { headers })
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
