import { importProvidersFrom } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CardModule } from 'primeng/card';


export function providePrimeNG() {
  return importProvidersFrom(
    BrowserAnimationsModule,
    ButtonModule,
    CardModule // Añade otros módulos de PrimeNG según lo necesites
  );
}
