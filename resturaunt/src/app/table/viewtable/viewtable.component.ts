import { Component } from '@angular/core';
import { TableModel } from '../../model/table.model';
import { TableService } from '../../service/table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewtable',
  templateUrl: './viewtable.component.html',
  styleUrl: './viewtable.component.css'
})
export class ViewtableComponent {
  tables: TableModel[] = []; // Array to hold table data
  errorMessage: string = ''; // To hold error messages

  constructor(private tableService: TableService, private router: Router) {}

  ngOnInit(): void {
    this.getAllTables(); // Fetch all tables on component initialization
  }

  getAllTables(): void {
    this.tableService.getAllTable().subscribe({
      next: (response) => {
        this.tables = response; // Assign the response to the tables array
      },
      error: (err) => {
        console.error('Error fetching tables:', err);
        this.errorMessage = 'Could not load tables. Please try again later.'; // Set error message
      }
    });
  }

  UpdateTable(table: TableModel): void {
    this.router.navigate(['/updatetable', table.id]);  // Navigate to update form with food ID
  }

  deleteTable(id: number): void {
    if (confirm('Are you sure you want to delete this table?')) {
      this.tableService.deleteTable(id).subscribe({
        next: () => {
          this.getAllTables(); // Refresh the table list after deletion
        },
        error: (err) => {
          console.error('Error deleting table:', err);
          this.errorMessage = 'Could not delete the table. Please try again later.';
        }
      });
    }
  }
}
