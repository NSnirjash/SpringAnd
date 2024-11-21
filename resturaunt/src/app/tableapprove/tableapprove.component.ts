import { Component } from '@angular/core';
import { TableBooking } from '../model/tablebooking.model';
import { TablebookingService } from '../service/tablebooking.service';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-tableapprove',
  templateUrl: './tableapprove.component.html',
  styleUrl: './tableapprove.component.css'
})
export class TableapproveComponent {

  bookings: TableBooking[] = [];  // To store all bookings
  selectedBooking: TableBooking | null = null;
  user: User = new User();
  searchBookingId: number = 0;
  errorMessage: string = '';

  constructor(
    private tableBookingService: TablebookingService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    let currentUser = this.authService.getUser();
    if (currentUser != null) {
      this.user = currentUser;
    }
    this.loadAllBookings();  // Load all bookings on init
  }

  approveBooking(bookingId: number) {
    const adminId = this.user.id; // Replace with how you retrieve the current admin's ID
    this.tableBookingService.approveBooking(bookingId, adminId).subscribe(
      (response) => {
        console.log('Booking approved successfully', response);
        this.loadAllBookings(); // Reload the bookings after approval
      },
      (error) => {
        console.error('Error approving booking', error);
      }
    );
  }

  rejectBooking(bookingId: number) {
    const adminId = this.user.id; // Replace with how you retrieve the current admin's ID
    this.tableBookingService.rejectBooking(bookingId, adminId).subscribe(
      (response) => {
        console.log('Booking rejected successfully', response);
        this.loadAllBookings(); // Reload the bookings after rejection
      },
      (error) => {
        console.error('Error rejecting booking', error);
      }
    );
  }


  // Load all bookings
  loadAllBookings() {
    this.tableBookingService.getAllBookings().subscribe(
      (data: TableBooking[]) => {
        this.bookings = data;
      },
      error => {
        console.error('Error loading bookings', error);
      }
    );
  }
  
  loadPendingBookings() {
    this.tableBookingService.getPendingBookings().subscribe({
      next: (data) => this.bookings = data,
      error: (err) => console.error('Error loading pending bookings', err)
    });
  }

  searchBookingById(bookingId: number) {
    if (bookingId > 0) {
      console.log('Searching for Booking ID:', this.searchBookingId);
      this.tableBookingService.getBookingById(bookingId).subscribe({
        next: (data) => this.bookings = [data],
        error: (err) => console.error('Error finding booking', err)
      });
    }
  }

  // Select a booking for detailed view
  selectBooking(booking: TableBooking) {
    this.selectedBooking = booking;
  }

}
