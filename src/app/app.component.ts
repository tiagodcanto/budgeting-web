import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/footer/footer.component";
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet , FooterComponent, MatCardModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'budgeting-web';
}
