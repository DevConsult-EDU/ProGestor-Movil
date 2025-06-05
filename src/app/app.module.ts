import {Injectable, NgModule} from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AuthService} from "./core/auth/services/auth-service.service";
import {authInterceptor} from "./core/auth/interceptors/auth-interceptor.interceptor";
import {ProjectLayoutComponent} from "./project-layout/project-layout.component";
import {NotificationIconModule} from "./features/notifications/components/notification-icon/notification-icon.module";
import {FullscreenLayoutComponent} from "./fullscreen-layout/fullscreen-layout.component";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent, ProjectLayoutComponent, FullscreenLayoutComponent],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HammerModule,
    NotificationIconModule,
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    provideHttpClient(withInterceptors([
      authInterceptor
    ])),
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerGestureConfig
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
