import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from './primeng.providers';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './interceptor/auth.interceptor';




export const appConfig: ApplicationConfig = {
  providers: [


    provideRouter(routes, withHashLocation()),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimations(),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right', // Cambiado a bottom-right
      preventDuplicates: true,
      enableHtml: true
    }),
    providePrimeNG(),
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule
    ),




  ]
};
