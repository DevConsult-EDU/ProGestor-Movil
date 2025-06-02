import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors} from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AuthService} from "./core/auth/services/auth-service.service";
import {authInterceptor} from "./core/auth/interceptors/auth-interceptor.interceptor";
import {ProjectLayoutComponent} from "./project-layout/project-layout.component";

@NgModule({
  declarations: [AppComponent, ProjectLayoutComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(withInterceptors([
        authInterceptor
      ])),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
