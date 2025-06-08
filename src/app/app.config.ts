import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { msalConfig } from './features/login/authConfig';
import { PublicClientApplication } from '@azure/msal-browser';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    { provide: MSAL_INSTANCE, useValue: new PublicClientApplication(msalConfig) },
    MsalService,
  ]
};
