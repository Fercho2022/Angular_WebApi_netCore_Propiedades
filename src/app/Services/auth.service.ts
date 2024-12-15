import { Injectable } from '@angular/core';
import { User } from '../Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  authUser(user:User):User{
    let UserArray=[];
    if(localStorage.getItem('Users')){

      UserArray=JSON.parse(localStorage.getItem('Users') || '[]');
    }

    console.log(UserArray);
      // Verificar si el usuario ya existe (por ejemplo, comparando userName y password)
      const userExists = UserArray.find((p: { userName: string; password: string; })=>p.userName===user.userName && p.password===user.password);
      console.log(userExists)
      return userExists
  }

}
