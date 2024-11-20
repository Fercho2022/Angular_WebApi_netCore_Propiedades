/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from './app/primeng.providers'; // Archivo donde se configuran los módulos de PrimeNG
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideToastr } from 'ngx-toastr';





bootstrapApplication(AppComponent, {
  providers: [

    provideAnimations(),
    providePrimeNG(), // Aquí agregamos los proveedores de PrimeNG
    provideHttpClient(),
    provideRouter(routes),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right', // Cambiado a bottom-right
      preventDuplicates: true,
      enableHtml: true
    }), // ToastrModule added



  ],
}).catch(err => console.error(err));



