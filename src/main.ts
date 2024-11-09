/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from './app/primeng.providers'; // Archivo donde se configuran los módulos de PrimeNG
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';


bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    providePrimeNG(), // Aquí agregamos los proveedores de PrimeNG
    provideHttpClient(),
    provideRouter(routes)

  ],
}).catch(err => console.error(err));
