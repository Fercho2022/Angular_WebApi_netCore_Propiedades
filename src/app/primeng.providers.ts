import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';

import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';



export function providePrimeNG() {
  return importProvidersFrom(
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,


  );
}
