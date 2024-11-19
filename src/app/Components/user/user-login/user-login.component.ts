import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent implements OnInit {
  private _authService = inject(AuthService);
  private router=inject(Router);

  constructor(private toastr:ToastrService){

  }

  ngOnInit(): void {}

  onLogin(loginForm: NgForm) {
    console.log(loginForm.value);
    const token = this._authService.authUser(loginForm.value);
    if (token) {
      localStorage.setItem('token', token.userName);
      this.toastr.success('Login Succesfully');
      this.router.navigate(['/']);
    } else {
      this.toastr.error('Login not Succesfully');
    }
  }
}
