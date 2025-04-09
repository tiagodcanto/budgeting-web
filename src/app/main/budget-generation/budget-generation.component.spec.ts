import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetGenerationComponent } from './budget-generation.component';

describe('BudgetGenerationComponent', () => {
  let component: BudgetGenerationComponent;
  let fixture: ComponentFixture<BudgetGenerationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BudgetGenerationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BudgetGenerationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
