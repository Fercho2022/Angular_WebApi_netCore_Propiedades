import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from '../Services/auth.service';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const platformId = inject(PLATFORM_ID);

  // Si estamos en el servidor, pasa la request sin modificar
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const authService = inject(AuthService);
  const token = authService.authToken();


  // Solo modifica la request si hay un token
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // Si no hay token, pasa la request sin modificar
  return next(req);
};
