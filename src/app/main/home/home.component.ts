import { Component } from '@angular/core';
import { BudgetGenerationComponent } from "../budget-generation/budget-generation.component";

@Component({
  selector: 'app-home',
  imports: [BudgetGenerationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
