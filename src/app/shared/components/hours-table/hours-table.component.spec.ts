import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursTableComponent } from './hours-table.component';

describe('HoursTableComponent', () => {
  let component: HoursTableComponent;
  let fixture: ComponentFixture<HoursTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HoursTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HoursTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
