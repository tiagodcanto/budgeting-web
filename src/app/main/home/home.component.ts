import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, MatButtonModule, MatCardModule, HeaderComponent, MatInputModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
