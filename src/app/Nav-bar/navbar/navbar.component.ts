import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { IDropdown } from '../../Interfaces/dropdown';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../Services/auth.service';

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
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService:AuthService
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
      action: () => this.authService.logout(),
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
