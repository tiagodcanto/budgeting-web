import { BudgetDataService } from './../../services/budget-data.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-garment-step',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatIconModule,
    MatDividerModule,
    MatCheckboxModule,
    MatExpansionModule
  ],
  templateUrl: './garment-step.component.html',
  styleUrl: './garment-step.component.scss'
})
export class GarmentStepComponent implements OnInit {
  @Input() availableGarmentTypes: any[] = [];

  garmentForm: FormGroup;

  constructor(private fb: FormBuilder, private budgetDataService: BudgetDataService) {
    this.garmentForm = this.fb.group({
      garments: this.fb.array([
        this.fb.group({
          name: [''],
          garmentType: [''],
          complexity: [''],
          moodboard: [false],
          sketching: [false],
          drawings: [false],
          TPAssembly: [false],
          size: [false],
          patterns: [false],
          material: [false],
          testing: [false],
          colourway: [''],
          fittings: [''],
          revision: ['']
        })
      ])
    });
    this.updateGarment();

  }

  ngOnInit() {}

  get garments(): FormArray {
    return this.garmentForm.get('garments') as FormArray;
  }

  addGarment() {
    console.log(this.availableGarmentTypes)
    const garmentGroup = this.fb.group({
      name: [''],
      garmentType: [''],
      complexity: [''],
      moodboard: [false],
      sketching: [false],
      drawings: [false],
      TPAssembly: [false],
      size: [false],
      patterns: [false],
      material: [false],
      testing: [false],
      colourway: [''],
      fittings: [''],
      revision: ['']
    });

    this.garments.push(garmentGroup);
      console.log(this.garments.value);


    this.updateGarment();

  }

  removeGarment(index: number) {
    this.garments.removeAt(index);
    this.updateGarment();

  }

  updateGarment() {
    this.budgetDataService.setGarments(this.garments.value);
  }
}
