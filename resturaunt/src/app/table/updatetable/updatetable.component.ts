import { Component } from '@angular/core';
import { TableModel } from '../../model/table.model';
import { TableService } from '../../service/table.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatetable',
  templateUrl: './updatetable.component.html',
  styleUrl: './updatetable.component.css'
})
export class UpdatetableComponent {

  table: TableModel = new TableModel(); // Instance of Tables model
  errorMessage: string = ''; // To hold error messages

  constructor(
    private tableService: TableService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTableById(); // Fetch table details on initialization
  }

  getTableById(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Get the table ID from the route
    if (id) {
      this.tableService.findTableById(+id).subscribe({
        next: (response) => {
          this.table = response; // Assign the fetched data to the table object
        },
        error: (err) => {
          console.error('Error fetching table:', err);
          this.errorMessage = 'Could not load table details. Please try again later.';
        }
      });
    }
  }

  updateTable(): void {
    if (this.table.id !== undefined) {
      this.tableService.updateTable(this.table, this.table.id).subscribe({
        next: () => {
          this.router.navigate(['/view-table']); // Redirect to view table after successful update
        },
        error: (err) => {
          console.error('Error updating table:', err);
          this.errorMessage = 'Could not update the table. Please try again later.';
        }
      });
    } else {
      console.error('Table ID is undefined');
      this.errorMessage = 'Table ID is required for updating.';
    }
  }

}
