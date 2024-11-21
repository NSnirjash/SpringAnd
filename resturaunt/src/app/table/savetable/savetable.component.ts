import { Component } from '@angular/core';
import { TableModel } from '../../model/table.model';
import { TableService } from '../../service/table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-savetable',
  templateUrl: './savetable.component.html',
  styleUrl: './savetable.component.css'
})
export class SavetableComponent {
  table: TableModel = {
    tableNumber: '',
    capacity: 0,
    status: 'Available' // Default status, adjust as needed
  };
  
  constructor(private tableService: TableService, private router: Router) {}

  saveTable(): void {
    this.tableService.saveTable(this.table).subscribe({
      next: (response) => {
        console.log('Table saved successfully!', response);
        alert('Table saved successfully!');
        // Navigate to another page or show a success message
        this.router.navigate(['/tables']); // Adjust the route as necessary
      },
      error: (err) => {
        console.error('Error saving table:', err);
        // Handle error case (e.g., show error message)
      }
    });
  }

}
