import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetDataService {

  hours = signal<any[]>([]);
  garments = signal<any[]>([]);

  constructor() { }

  setGarments(data: any) {
    this.garments.set(data);
  }

  setHours(data: any) {
    this.hours.set(data);
  }

  clearAll() {
    this.garments.set([]);
    this.hours.set([]);
  }

  getState() {
    return {
      garments: this.garments(),
      hours: this.hours()
    };
  }
}
