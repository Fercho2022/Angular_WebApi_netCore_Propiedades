/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from './app/primeng.providers'; // Archivo donde se configuran los módulos de PrimeNG

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    providePrimeNG(), // Aquí agregamos los proveedores de PrimeNG
  ],
}).catch(err => console.error(err));
