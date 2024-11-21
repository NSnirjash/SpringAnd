import { Component, OnInit } from '@angular/core';
import { TableBooking } from '../model/tablebooking.model';
import { User } from '../model/user.model';
import { TableModel } from '../model/table.model';
import { TablebookingService } from '../service/tablebooking.service';
import { TableService } from '../service/table.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-tablebooking',
  templateUrl: './tablebooking.component.html',
  styleUrl: './tablebooking.component.css'
})
export class TablebookingComponent implements OnInit {

  tableBooking: TableBooking = new TableBooking();
  availableTables: TableModel[] = [];
  userBookings: TableBooking[] = [];  // To store user's bookings
  user: User = new User();

  constructor(private tableBookingService: TablebookingService,
    private authService: AuthService,
    private tableService: TableService) { }


  ngOnInit(): void {
    let currentUser = this.authService.getUser();
    if (currentUser != null) {
      this.user = currentUser;
    }
    this.loadAllTables();  // Load all available tables on init
    this.loadUserBookings();  // Load user's bookings on init
  }


  // Load all available tables
  loadAllTables() {
    this.tableService.getAllTable().subscribe(
      (data: TableModel[]) => {
        // Filter available tables based on status
        this.availableTables = data.filter(table => table.status.toLowerCase() === 'Available'.toLowerCase());
      },
      error => {
        console.error('Error loading tables', error);
      }
    );
  }

  // Load user's bookings
  loadUserBookings() {
    this.tableBookingService.getUserBookings(this.user.id).subscribe(
      (data: TableBooking[]) => {
        this.userBookings = data;
      },
      error => {
        console.error('Error loading user bookings', error);
      }
    );
  }

  // Create a new booking
  createBooking(selectedTable: TableModel) {
    this.tableBooking.tables = selectedTable;
    this.tableBooking.bookedBy = this.user;
    this.tableBooking.status = 'PENDING';  // Default status for new bookings

    this.tableBookingService.createBooking(this.tableBooking).subscribe(
      (data: TableBooking) => {
        console.log('Booking created successfully', data);
        this.loadUserBookings();  // Reload user bookings after creating a booking
        this.loadAllTables(); // Reload available tables
      },
      error => {
        console.error('Error creating booking', error);
      }
    );
  }

  // Cancel a booking
  cancelBooking(bookingId: number) {
    this.tableBookingService.cancelBooking(bookingId).subscribe(
      (response: string) => {
        console.log('Booking cancelled successfully', response);
        this.loadUserBookings();  // Reload user bookings after cancellation
        this.loadAllTables(); // Reload available tables
      },
      error => {
        console.error('Error cancelling booking', error);
      }
    );
  }
}
