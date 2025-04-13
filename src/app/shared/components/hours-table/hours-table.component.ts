import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';


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
  ],
  templateUrl: './hours-table.component.html',
  styleUrl: './hours-table.component.scss'
})
export class HoursTableComponent implements OnInit {
  @Input() rows: any[] = [];
  @Output() rowsChange = new EventEmitter<any[]>();

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

  displayedColumns = ['garmentType', 'level', ...this.taskColumns.map(t => t.key)];
  garmentFilter = '';
  filteredGarmentTypes: string[] = [];

  ngOnInit() {
    this.filteredGarmentTypes = [...this.garmentTypes];
  }

  filterGarmentTypes() {
    const filter = this.garmentFilter.toLowerCase();
    this.filteredGarmentTypes = this.garmentTypes.filter(type =>
      type.toLowerCase().includes(filter)
    );
  }

  addGarmentRow() {
    console.log(this.rows)
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

    if (
      selected !== 'Other' &&
      this.rows.filter(r => r.garmentType === selected).length > 1
    ) {
      alert(`You already selected "${selected}". Please choose a different type.`);
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
}
