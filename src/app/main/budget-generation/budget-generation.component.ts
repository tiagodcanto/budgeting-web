import { BudgetDataService } from './../../shared/services/budget-data.service';
import { MatStepperModule } from '@angular/material/stepper';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormArray, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material/slider';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { HoursTableComponent } from '../../shared/components/hours-table/hours-table.component';
import { PdfService } from '../../shared/services/pdf.service';
import { GarmentStepComponent } from "../../shared/components/garment-step/garment-step.component";
import { HeaderComponent } from '../../shared/header/header.component';


@Component({
    selector: 'app-budget-generation',
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
    MatStepperModule,
    MatAutocompleteModule,
    HoursTableComponent,
    GarmentStepComponent,
    HeaderComponent
],
    templateUrl: './budget-generation.component.html',
    styleUrl: './budget-generation.component.scss'
})
export class BudgetGenerationComponent implements OnInit {

  @ViewChild('input') input: ElementRef<HTMLInputElement> | undefined;


  budgetForm = this.fb.group({
    ratePerHour: [''],
    currency: ['USD'],
    complexityLevel: ['default'],
    level: [null],
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
    complexityLevel: [null],
    level: [],
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
    { code: 'USD', name: 'US Dollar', symbol: '$'},
    { code: 'EUR', name: 'Euro', symbol: '€'},
    { code: 'GBP', name: 'British Pound', symbol: '£'},
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥'},
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥'},
    { code: 'INR', name: 'Indian Rupee', symbol: '₹'},
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$'},
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$'},
    { code: 'BRL', name: 'Brazilian Real', symbol: 'R$'},
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF'},
    { code: 'KRW', name: 'South Korean Won', symbol: '₩'},
    { code: 'MXN', name: 'Mexican Peso', symbol: '$'}
  ];

  currencyFilter = new FormControl('');
  filteredCurrencies: any;
  searchTerm = '';
  garmentData: any = [];
  rowsData: any[] = [];
  garmentsList: any = [];
  selectedGarmentTypes: string[] = [];

  constructor(private fb: FormBuilder, private _formBuilder: FormBuilder, private pdfService: PdfService,
    private budgetDataService: BudgetDataService) {
    this.filteredCurrencies = this.currencies;

    this.currencyFilter.valueChanges.subscribe(value => {
      this.filteredCurrencies = this.currencies.filter(c =>
        c.name.toLowerCase().includes(value!.toLowerCase()) ||
        c.code.toLowerCase().includes(value!.toLowerCase())
      );
    });
  }

  ngOnInit(): void {}

  get garments() {
    return this.budgetForm.get('garments') as FormArray;
  }

  get selectedCurrencySymbol(): string {
    const selected = this.currencies.find(c => c.code === this.firstFormGroup.value.currency);
    return selected?.symbol || '';
  }

  filterCurrencies() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCurrencies = this.currencies.filter(
      c =>
        c.name.toLowerCase().includes(term) ||
        c.code.toLowerCase().includes(term) ||
        c.symbol.toLowerCase().includes(term)
    );
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

  downloadPDF() {
    this.pdfService.generateGarmentBudgetReport(this.budgetDataService.garments(), this.budgetDataService.hours(),
    {
      alignmentMeetings: false,
      alignmentMeetingsCount: 0,
      taxEnabled: false,
      taxPercent: 0,
      additionalExpenseEnabled: false,
      additionalExpenseType: 'number',
      additionalExpenseValue: 0,
    }, this.selectedCurrencySymbol,
      this.firstFormGroup.get('ratePerHour')?.value ? this.firstFormGroup.get('ratePerHour')?.value : 0);
  }

  onRowsUpdated(updatedRows: any[]): void {
    this.rowsData = updatedRows;
  }

  onSelectedGarmentTypesChange(selectedTypes: string[]): void {
    this.selectedGarmentTypes = selectedTypes;
    console.log('Selected Garment Types:', selectedTypes);

    console.log('Selected Garment Types:', this.selectedGarmentTypes);
  }

  getGarmentList() {
    console.log(this.budgetDataService.garments());
        console.log(this.budgetDataService.hours());

  }
}

