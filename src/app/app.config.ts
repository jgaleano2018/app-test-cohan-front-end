import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
//import {authenticationInterceptor} from "./utils/interceptor/auth.interceptor";
//import {provideToastr} from "ngx-toastr";
//import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    //provideToastr(),
    //provideAnimationsAsync(),
    provideHttpClient(
      withFetch()
      //withInterceptors([authenticationInterceptor])
    )
  ]
};
