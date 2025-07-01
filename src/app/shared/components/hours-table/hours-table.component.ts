import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BudgetDataService } from '../../services/budget-data.service';


@Component({
  selector: 'app-hours-table',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './hours-table.component.html',
  styleUrl: './hours-table.component.scss'
})
export class HoursTableComponent implements OnInit, OnChanges {
  rows = new MatTableDataSource([]);
  dataToDisplay: any[] = [];

  @Input() complexityLevel: any;
  @Input() level: any;
  @Output() rowsChange = new EventEmitter<any[]>();
  @Output() selectedGarmentTypesChange = new EventEmitter<string[]>();

  taskColumns = [
    { key: 'sketch', label: 'Sketch (hrs)' },
    { key: 'techDesign', label: 'Technical Design (hrs)' },
    { key: 'techPack', label: 'Tech Pack (hrs)' }
  ];

  hourPresets: any = {
    intermediate: {
      'Jeans and pants': {
        sketch: { simple: 1, complex: 2, intricate: 3 },
        techDesign: { simple: 1, complex: 1.5, intricate: 2 },
        techPack: { simple: 0.5, complex: 1, intricate: 1.5 }
      },
      'Coats and Jackets': {
        sketch: { simple: 2, complex: 3, intricate: 4 },
        techDesign: { simple: 1.5, complex: 2, intricate: 3 },
        techPack: { simple: 1, complex: 1.5, intricate: 2 }
      },
      'T-shirts and sweatshirts': {
        sketch: { simple: 0.5, complex: 1, intricate: 1.5 },
        techDesign: { simple: 0.5, complex: 1, intricate: 1.5 },
        techPack: { simple: 0.5, complex: 0.75, intricate: 1 }
      },
      'Blouses and button-ups': {
        sketch: { simple: 1, complex: 1.5, intricate: 2.5 },
        techDesign: { simple: 1, complex: 1.5, intricate: 2 },
        techPack: { simple: 0.5, complex: 1, intricate: 1.5 }
      },
      'Dresses': {
        sketch: { simple: 1.5, complex: 2.5, intricate: 3.5 },
        techDesign: { simple: 1.5, complex: 2, intricate: 3 },
        techPack: { simple: 1, complex: 1.5, intricate: 2 }
      },
      'Skirts': {
        sketch: { simple: 0.75, complex: 1.5, intricate: 2 },
        techDesign: { simple: 0.75, complex: 1.5, intricate: 2 },
        techPack: { simple: 0.5, complex: 1, intricate: 1.5 }
      },
      'Hoodies and light jackets': {
        sketch: { simple: 1.5, complex: 2.5, intricate: 3.5 },
        techDesign: { simple: 1.5, complex: 2, intricate: 3 },
        techPack: { simple: 1, complex: 1.5, intricate: 2 }
      },
      'Overalls': {
        sketch: { simple: 1.5, complex: 2, intricate: 3 },
        techDesign: { simple: 1.5, complex: 2, intricate: 3 },
        techPack: { simple: 1, complex: 1.5, intricate: 2 }
      },
      'Neckwear': {
        sketch: { simple: 0.25, complex: 0.5, intricate: 1 },
        techDesign: { simple: 0.25, complex: 0.5, intricate: 1 },
        techPack: { simple: 0.25, complex: 0.5, intricate: 1 }
      },
      'Gloves': {
        sketch: { simple: 0.5, complex: 1, intricate: 1.5 },
        techDesign: { simple: 0.5, complex: 1, intricate: 1.5 },
        techPack: { simple: 0.5, complex: 1, intricate: 1.5 }
      },
      'Caps': {
        sketch: { simple: 0.5, complex: 1, intricate: 1.5 },
        techDesign: { simple: 0.5, complex: 1, intricate: 1.5 },
        techPack: { simple: 0.5, complex: 1, intricate: 1.5 }
      },
      'Socks': {
        sketch: { simple: 0.25, complex: 0.5, intricate: 0.75 },
        techDesign: { simple: 0.25, complex: 0.5, intricate: 0.75 },
        techPack: { simple: 0.25, complex: 0.5, intricate: 0.75 }
      },
      'Bra': {
        sketch: { simple: 1, complex: 1.5, intricate: 2.5 },
        techDesign: { simple: 1, complex: 1.5, intricate: 2 },
        techPack: { simple: 0.75, complex: 1.5, intricate: 2 }
      },
      'Panties': {
        sketch: { simple: 0.5, complex: 1, intricate: 1.5 },
        techDesign: { simple: 0.5, complex: 1, intricate: 1.5 },
        techPack: { simple: 0.5, complex: 1, intricate: 1.5 }
      },
      'Corsetry and lingerie': {
        sketch: { simple: 1.5, complex: 2.5, intricate: 4 },
        techDesign: { simple: 1.5, complex: 2.5, intricate: 3.5 },
        techPack: { simple: 1, complex: 2, intricate: 3 }
      }
    },
    professional: {},
    senior: {}
  };
  garmentTypes = [
    'Jeans and pants',
    'Coats and Jackets',
    'T-shirts and sweatshirts',
    'Blouses and button-ups',
    'Dresses',
    'Skirts',
    'Hoodies and light jackets',
    'Overalls',
    'Neckwear',
    'Gloves',
    'Caps',
    'Socks',
    'Bra',
    'Panties',
    'Corsetry and lingerie',
    'Other'
  ];

  displayedColumns = ['garmentType', 'level', ...this.taskColumns.map(t => t.key), 'delete'];
  garmentFilter = '';
  filteredGarmentTypes: string[] = [];
  levels = ['intermediate', 'professional', 'senior'];

  constructor(private snackBar: MatSnackBar, private budgetDataService: BudgetDataService) {}

  ngOnInit() {
    this.filteredGarmentTypes = [...this.garmentTypes];
  }

  ngOnChanges(changes: SimpleChanges): void {
    const complexityChanged = changes['complexityLevel'];
    const levelChanged = changes['level'];

    if ((complexityChanged && this.complexityLevel === 'default' && !complexityChanged.firstChange) ||
        (levelChanged && !levelChanged.firstChange && this.complexityLevel === 'default')) {
      this.buildDefaultTable();
    }

      this.emitSelectedGarmentTypes();
      this.updateHours();
  }

  filterGarmentTypes() {
    const filter = this.garmentFilter.toLowerCase();
    this.filteredGarmentTypes = this.garmentTypes.filter(type =>
      type.toLowerCase().includes(filter)
    );
  }

  addGarmentRow() {

    const newRow = {
      garmentType: '',
      customGarmentType: '',
      level: '',
      sketch: { simple: 0, complex: 0, intricate: 0 },
      techDesign: { simple: 0, complex: 0, intricate: 0 },
      techPack: { simple: 0, complex: 0, intricate: 0 }
    };
    const updated = [...this.dataToDisplay, newRow];
    this.dataToDisplay = updated;
    this.rows.data = <any>this.dataToDisplay;
    this.rowsChange.emit(updated);
  }

  getDisplayGarmentType(row: any): string {
    return row.garmentType === 'Other' ? row.customGarmentType : row.garmentType;
  }

  onGarmentTypeChange(row: any) {
    const selectedType = row.garmentType;
    const selectedLevel = row.level;

    // Allow multiple "Other"
    if (selectedType === 'Other') {
      this.applyAutoFill(row);
      return;
    }

    const duplicate = this.dataToDisplay.some(r =>
      r !== row &&
      r.garmentType === selectedType &&
      r.level === selectedLevel
    );

    if (duplicate) {
      this.snackBar.open(`"${selectedType}" already exists for "${selectedLevel}".`, 'Close', {
        duration: 3000,
        panelClass: ['snackbar-warning']
      });
      row.garmentType = '';
      return;
    }

    this.applyAutoFill(row);
  }

  applyAutoFill(row: any) {
    const level = row.level;
    const garment = row.garmentType;

    const preset = this.hourPresets?.[level]?.[garment];
    if (!preset) return;

    row.sketch = { ...preset.sketch };
    row.techDesign = { ...preset.techDesign };
    row.techPack = { ...preset.techPack };
  }

  buildDefaultTable() {
    if (!this.complexityLevel || !this.level) return;

    const level = this.level;
    const defaultRows: any[] = [];

    this.garmentTypes.forEach(garmentType => {
      if (garmentType !== 'Other') {
        const preset = this.hourPresets[level]?.[garmentType];

        const row = {
          garmentType,
          customGarmentType: '',
          level,
          sketch: { simple: 0, complex: 0, intricate: 0 },
          techDesign: { simple: 0, complex: 0, intricate: 0 },
          techPack: { simple: 0, complex: 0, intricate: 0 }
        };

        if (preset) {
          row.sketch = { ...preset.sketch };
          row.techDesign = { ...preset.techDesign };
          row.techPack = { ...preset.techPack };
        }

        defaultRows.push(row);
      }
    });

    this.dataToDisplay = defaultRows;
    this.rows.data = <any>this.dataToDisplay;
    this.rowsChange.emit(defaultRows);
    this.updateHours();
  }

  removeRow(index: number): void {
    if (index >= 0 && index < this.dataToDisplay.length) {
      const updatedRows = [...this.dataToDisplay];
      updatedRows.splice(index, 1); // Remove the row at the specified index

      this.dataToDisplay = updatedRows;
      this.rows.data = <any>this.dataToDisplay;
      this.updateHours();
      this.rowsChange.emit(updatedRows);
    }
  }

  getAvailableGarmentTypes(currentType: string = '', currentLevel: string = ''): string[] {
    const usedMap: Record<string, Set<string>> = {};

    for (const row of this.dataToDisplay) {
      if (!usedMap[row.garmentType]) {
        usedMap[row.garmentType] = new Set();
      }
      usedMap[row.garmentType].add(row.level);
    }

    const available = this.garmentTypes.filter(type => {
      if (type === 'Other') return true;

      const usedLevels = usedMap[type] || new Set();

      // Allow if:
      // - Type not fully used
      // - OR it’s the current selected value (even if fully used)
      const isCurrent = type === currentType;
      return usedLevels.size < 3 || isCurrent;
    });

    // Ensure current value is always in the list (in case it's a custom/legacy value)
    if (currentType && !available.includes(currentType)) {
      available.push(currentType);
    }

    return available;
  }

  emitSelectedGarmentTypes(): void {
    this.selectedGarmentTypesChange.emit(this.dataToDisplay);
  }

  updateHours() {
    this.budgetDataService.setHours(this.dataToDisplay);
  }

  getDisabledLevels(currentRow: any): string[] {
    const type = currentRow.garmentType;
    if (!type || type === 'Other') return [];

    return this.dataToDisplay
      .filter(row => row !== currentRow && row.garmentType === type)
      .map(row => row.level);
  }

  onLevelChange(row: any) {
    const selectedType = row.garmentType;
    const selectedLevel = row.level;

    if (!selectedType || selectedType === 'Other') {
      this.applyAutoFill(row);
      return;
    }

    const duplicate = this.dataToDisplay.some(r =>
      r !== row &&
      r.garmentType === selectedType &&
      r.level === selectedLevel
    );

    if (duplicate) {
      this.snackBar.open(`"${selectedType}" already exists with "${selectedLevel}".`, 'Close', {
        duration: 3000,
        panelClass: ['snackbar-warning']
      });
      row.level = '';
      return;
    }

    this.applyAutoFill(row);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.rows.filter = filterValue.trim().toLowerCase();
  }
}
