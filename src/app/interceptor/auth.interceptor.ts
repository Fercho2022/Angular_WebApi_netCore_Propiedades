import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest
 } from "@angular/common/http";
 import { inject, PLATFORM_ID } from "@angular/core";
 import { ToastrService } from "ngx-toastr";
 import { catchError, of, retry, throwError } from "rxjs";
 import { AuthService } from "../Services/auth.service";
 import { isPlatformBrowser } from "@angular/common";

 export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
 ) => {
  const platformId = inject(PLATFORM_ID);
  const toastr = inject(ToastrService);
  const authService = inject(AuthService);

  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authService.authToken()}`
    }
  });

  return next(authReq).pipe(
    retry({
      count: 3,
      delay: (error) => {
        if (error.status === 0) {
          toastr.error('Error de conexión con el servidor');
          return of(error);
        }
        return throwError(() => error);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      const errorMessage = setError(error, toastr);
      console.log(error);

      return throwError(() => errorMessage);
    })
  );
 };

 const setError = (error: HttpErrorResponse, toastr: ToastrService): string => {
  let errorMessage = 'Error desconocido';

  switch (error.status) {
      case 0:
          errorMessage = 'Error de conexión con el servidor';
          break;
      case 400:
          if (error.error) {
              if (typeof error.error === 'string') {
                  errorMessage = error.error;
              } else if (error.error.error) {
                  errorMessage = error.error.error;
              } else if (error.error.errors) {
                  // Si es un array de errores de Identity
                  if (Array.isArray(error.error.errors)) {
                      // Mapeo específico de errores de Identity
                      const identityErrors = error.error.errors.map((e: any) => {
                          switch (e.code) {
                              case 'DuplicateUserName':
                                  return 'El nombre de usuario ya está en uso';
                              case 'DuplicateEmail':
                                  return 'El email ya está registrado';
                              default:
                                  return e.description;
                          }
                      });
                      errorMessage = identityErrors.join(', ');
                  } else {
                      errorMessage = Object.values(error.error.errors).join(', ');
                  }
              }
          }
          break;
      case 401:
          errorMessage = 'Usuario y/o contraseña incorrectos';
          break;
      case 500:
          errorMessage = 'Error interno del servidor';
          if (error.error?.details) {
              console.error('Detalles del error:', error.error.details);
          }
          break;
      default:
          if (error.error instanceof ErrorEvent) {
              errorMessage = error.error.message;
          } else if (error.error?.errorMessage) {
              errorMessage = error.error.errorMessage;
          }
  }

  toastr.error(errorMessage);
  return errorMessage;
};


