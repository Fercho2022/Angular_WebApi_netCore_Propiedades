import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { IDropdown } from '../../Interfaces/dropdown';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    RouterLinkActive,
    BsDropdownModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  loggedinUser: string = '';
  items: Array<IDropdown> = [
    {
      text: 'View Dashboard',
      icon: 'fas fa-tachometer-alt',
      action: () => this.viewDashboard(),
    },
    {
      text: 'My Profile',
      icon: 'far fa-user-circle',
      action: () => this.viewProfile(),
    },
    {
      text: 'Change Password',
      icon: 'fas fa-key',
      action: () => this.changePassword(),
    },
    {
      text: 'Logout',
      icon: 'fas fa-sign-out-alt',
      action: () => this.onLogout(),
    },
  ];

  ngOnInit() {}

  loggedin(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      this.loggedinUser = localStorage.getItem('userName') || '';
      return !!localStorage.getItem('userName');
    }
    return false;
  }

  onLogout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      this.router.navigate(['/']);
      this.toastr.success("You are logged out");
    }
  }

  changePassword() {
    this.router.navigate(['/']);
  }

  viewDashboard() {
    this.router.navigate(['/']);
  }

  viewProfile() {
    this.router.navigate(['/']);
  }
}
