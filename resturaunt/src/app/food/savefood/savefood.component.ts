import { Component } from '@angular/core';
import { FoodModel } from '../../model/food.model';
import { FoodService } from '../../service/food.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-savefood',
  templateUrl: './savefood.component.html',
  styleUrl: './savefood.component.css'
})
export class SavefoodComponent {

  food: FoodModel = new FoodModel();
  imageFile: File | null = null;
  errorMessage: string = '';

  constructor(private foodService: FoodService, private router: Router) { }

  onImageSelected(event: any): void {
    this.imageFile = event.target.files[0];
  }

  saveFood(): void {
    if (this.imageFile) {
      this.foodService.saveFood(this.food, this.imageFile).subscribe({
        next: () => {
          alert('Food added successfully!');
        },
        error: (err) => {
          this.errorMessage = 'Failed to add food: ' + err.message;
        }
      });
    } else {
      this.errorMessage = 'Please select an image file.';
    }
    this.router.navigate(['/viewfood']);  // Navigate to food list or another route after saving
  }
}
