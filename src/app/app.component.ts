import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Nav-bar/navbar/navbar.component";
import { CardComponent } from "./Components/Card/card.component";
import { ListCardComponent } from "./Components/list-card/list-card.component";
import { CommonModule } from '@angular/common';
import { AddPropertyComponent } from './Components/add-property/add-property.component';
import { ToastrModule } from 'ngx-toastr';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastrModule, NavbarComponent, CardComponent, ListCardComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})

export class AppComponent {
  title = 'propiedades';
}
