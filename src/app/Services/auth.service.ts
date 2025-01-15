import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { LoginModel, LoginResponse, User} from '../Interfaces/IUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

baseUrl=environment.baseUrl;


constructor(private http: HttpClient) {}

authUser(user: LoginModel):Observable<LoginResponse> {

  return this.http.post<LoginResponse>(this.baseUrl + '/Account/login', user)


}
}
