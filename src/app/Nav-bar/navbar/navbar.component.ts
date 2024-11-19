import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterModule, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',

})

export class NavbarComponent {





  ngOnInit(){

  }

  loggedin():boolean{
    return !!localStorage.getItem('token');


  }

  onLogout(){
    localStorage.removeItem('token');

  }
}
