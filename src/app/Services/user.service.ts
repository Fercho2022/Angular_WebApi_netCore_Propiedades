import { Injectable } from '@angular/core';
import { User } from '../Interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  addUser(user: User) {
    let users;

    if (localStorage.getItem('Users')) {
      users = JSON.parse(localStorage.getItem('Users') || '[]');

      if (!Array.isArray(users)) {
        users = []; // Si no es un arreglo, inicialízalo
      }
      // Verificar si el usuario ya existe (por ejemplo, comparando por email)
      const userExists = users.some(
        (existingUser: any) => existingUser.email === user.email
      );
      if (!userExists) {
        // Agregar el usuario solo si no existe
        users = [user, ...users];
      }
    } else {
      users = [user];
    }
    // Guardar en localStorage
    localStorage.setItem('Users', JSON.stringify(users));
  }
}
