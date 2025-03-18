import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  LoginModel,
  LoginResponse,
  UserFormRegister,
} from '../Interfaces/IUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResetPasswordModel } from '../Interfaces/ResetPasswordModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  authUser(user: LoginModel): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl + '/Account/login', user);
  }

  registerUser(user: UserFormRegister) {
    return this.http.post(this.baseUrl + '/Account/register', user);
  }

  authToken(): string {
    return localStorage.getItem('token') || '';
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('userName');
      this.router.navigate(['/']);
      this.toastr.success('You are logged out');
    }
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.baseUrl}/Account/forgot-password`, { email });
  }

  resetPassword(resetData: ResetPasswordModel) {
    return this.http.post(`${this.baseUrl}/Account/reset-password`, resetData);
  }
}
