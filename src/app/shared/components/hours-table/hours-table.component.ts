import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


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
  @Input() rows: any[] = [];
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
      }
      // Add more garments...
    },
    professional: {
      // ...same structure
    },
    senior: {
      // ...same structure
    }
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

  constructor(private snackBar: MatSnackBar) {}

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
  }

  filterGarmentTypes() {
    const filter = this.garmentFilter.toLowerCase();
    this.filteredGarmentTypes = this.garmentTypes.filter(type =>
      type.toLowerCase().includes(filter)
    );
  }

  addGarmentRow() {
    const availableGarmentTypes = this.getAvailableGarmentTypes();

    if (availableGarmentTypes.length === 0) {
      this.snackBar.open('No more garment types available to add.', 'Close', {
        duration: 3000,
        panelClass: ['snackbar-warning']
      });
      return;
    }
    const newRow = {
      garmentType: '',
      customGarmentType: '',
      level: '',
      sketch: { simple: 0, complex: 0, intricate: 0 },
      techDesign: { simple: 0, complex: 0, intricate: 0 },
      techPack: { simple: 0, complex: 0, intricate: 0 }
    };
    const updated = [...this.rows, newRow];
    this.rows = updated;
    this.rowsChange.emit(updated);
  }

  getDisplayGarmentType(row: any): string {
    return row.garmentType === 'Other' ? row.customGarmentType : row.garmentType;
  }

  onGarmentTypeChange(row: any) {
    const selected = row.garmentType;
    console.log(row.garmentType)

    // Allow multiple "Other" types
    if (selected !== 'Other' && this.rows.some(r => r.garmentType === selected && r !== row)) {
      this.snackBar.open(`"${selected}" is already selected. Choose a different type.`, 'Close', {
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

    this.rows = defaultRows;
    this.rowsChange.emit(defaultRows);
  }

  removeRow(index: number): void {
    if (index >= 0 && index < this.rows.length) {
      const updatedRows = [...this.rows];
      updatedRows.splice(index, 1); // Remove the row at the specified index

      this.rows = updatedRows;
      this.rowsChange.emit(updatedRows);
    }
  }

  getAvailableGarmentTypes(selectedType: string = ''): string[] {
    const selectedTypes = this.rows.map(row => row.garmentType);

    return this.garmentTypes.filter(type => {
      return type === 'Other' || type === selectedType || !selectedTypes.includes(type);
    });
  }

  emitSelectedGarmentTypes(): void {
    this.selectedGarmentTypesChange.emit(this.rows);
  }
}
