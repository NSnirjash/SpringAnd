import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodModel } from '../../model/food.model';
import { FoodService } from '../../service/food.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-updatefood',
  templateUrl: './updatefood.component.html',
  styleUrl: './updatefood.component.css'
})
export class UpdatefoodComponent implements OnInit{

  foodForm: FormGroup;
  foodId!: number;
  food!: FoodModel;
  selectedFile: File | null = null;

  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    // Initialize the form with validation
    this.foodForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      available: [false, Validators.required],
      image: [null]
    });
  }

  ngOnInit(): void {
    this.foodId = this.route.snapshot.params['id'];
    this.loadFoodDetails();
  }
    

  // Fetch the food details and populate the form
  loadFoodDetails(): void {
    this.foodService.findFoodById(this.foodId).subscribe((data: FoodModel) => {
      this.food = data;
      this.foodForm.patchValue({
        name: this.food.name,
        price: this.food.price,
        category: this.food.category,
        available: this.food.available
      });
    });
  }

  // Handle file input change for the image
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Update the food item with the form data and optional image
  updateFood(): void {
    if (this.foodForm.valid) {
      const updatedFood = { ...this.food, ...this.foodForm.value };
      
      if (this.selectedFile) {
        // If a new image is selected, include it in the request
        this.foodService.saveFood(updatedFood, this.selectedFile).subscribe(() => {
          this.router.navigate(['/viewfood']);
        });
      } else {
        // If no image is selected, update the food without an image
        this.foodService.updateFood(updatedFood).subscribe(() => {
          this.router.navigate(['/viewfood']);
        });
      }
    }
  }
}
