import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from "@angular/material/card";


@Component({
    selector: 'app-header',
    imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, RouterLink, MatIconModule, MatMenuModule, MatSidenavModule, MatListModule, MatCardModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit(): void {}

}
