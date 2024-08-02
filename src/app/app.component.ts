import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Nav-bar/navbar/navbar.component";
import { CardComponent } from "./Components/Card/card.component";
import { ListCardComponent } from "./Components/list-card/list-card.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CardComponent, ListCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'propiedades';
}
