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
  imports: [FormsModule, CommonModule, ],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css',
})
export class UserLoginComponent implements OnInit {


  loginModel : LoginModel= {
    userName: '',
    password: ''

  };

  constructor(
    private toastr: ToastrService,
    private _authService: AuthService,
    private router: Router,

  ) {}

  ngOnInit(): void {}

  onLogin(loginForm: NgForm) {
    if (loginForm.valid) {
      console.log('Enviando datos:', this.loginModel);

      this._authService.authUser(this.loginModel).subscribe({
        next: (response: LoginResponse) => {
          console.log('Login exitoso:', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', response.userName);

          this.toastr.success('Login exitoso', 'Bienvenido!');
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error en login:', error);
          let errorMessage = 'Error en el login';

          if (error.status === 401) {
            errorMessage = 'Usuario o contraseña incorrectos';
          } else if (error.status === 400) {
            errorMessage = 'Datos inválidos';
          }

          this.toastr.error(errorMessage);
        }
      });
    }
  }
}
