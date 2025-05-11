import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarmentStepComponent } from './garment-step.component';

describe('GarmentStepComponent', () => {
  let component: GarmentStepComponent;
  let fixture: ComponentFixture<GarmentStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarmentStepComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarmentStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
