import { NgModule} from '@angular/core';
import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {authInterceptor} from "./core/auth/interceptors/auth-interceptor.interceptor";
import {ProjectLayoutComponent} from "./project-layout/project-layout.component";
import {FullscreenLayoutComponent} from "./fullscreen-layout/fullscreen-layout.component";
import {CommonModule} from "@angular/common";
import {
  NotificationIconComponent
} from "./features/notifications/components/notification-icon/notification-icon.component";

@NgModule({
  declarations: [AppComponent, ProjectLayoutComponent, FullscreenLayoutComponent],
  imports: [
    BrowserModule,
    CommonModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HammerModule,
    NotificationIconComponent,
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
