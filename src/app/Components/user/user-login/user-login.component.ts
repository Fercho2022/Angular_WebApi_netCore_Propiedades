import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LoginModel, LoginResponse} from '../../../Interfaces/IUser';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent {

  loginModel: LoginModel = {
    userName: '',
    password: ''
  };
  private toastr = inject(ToastrService);
  constructor(
    private _authService: AuthService,
    private router: Router,

  ) {}

  onLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      this._authService.authUser(this.loginModel).subscribe({
        next: (response: LoginResponse) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', response.userName);
          this.toastr.success('Login exitoso', 'Bienvenido!');
          this.router.navigate(['/']);
        }
      });
    }
  }
}
