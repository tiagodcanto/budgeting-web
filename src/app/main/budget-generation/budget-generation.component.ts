import { MatStepperModule } from '@angular/material/stepper';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-budget-generation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatCardModule,
    MatStepperModule
  ],
  templateUrl: './budget-generation.component.html',
  styleUrl: './budget-generation.component.scss'
})
export class BudgetGenerationComponent implements OnInit {
  budgetForm = this.fb.group({
    ratePerHour: [''],
    currency: ['USD'],
    complexityLevel: ['default'],
    garments: this.fb.array([this.createGarmentForm()]),
    alignmentMeetings: [false],
    meetingsNumber: [''],
    taxes: [false],
    taxPercentage: [''],
    additionalExpenses: [false],
    expenseAmount: [''],
  });

  firstFormGroup = this._formBuilder.group({
    ratePerHour: [''],
    currency: ['USD'],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
    services: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;
  currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' }
  ];

  constructor(private fb: FormBuilder, private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {}

  get garments() {
    return this.budgetForm.get('garments') as FormArray;
  }

  get selectedCurrencySymbol(): string {
    const selected = this.currencies.find(
      c => c.code === this.firstFormGroup.value.currency
    );
    return selected?.symbol || '';
  }

  createGarmentForm(): FormGroup {
    return this.fb.group({
      garmentType: [''],
      complexity: [1],
      services: this.fb.group({
        moodboard: [false],
        conceptSketching: [false],
        technicalDrawings: [false],
        // add more as needed
      }),
    });
  }

  addGarment() {
    this.garments.push(this.createGarmentForm());
  }

  submitBudget() {
    console.log(this.budgetForm.value);
    // Handle submission logic
  }
}
