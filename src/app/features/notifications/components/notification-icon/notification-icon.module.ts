import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NotificationIconComponent} from "./notification-icon.component";
import {IonicModule} from "@ionic/angular";
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [NotificationIconComponent],
  exports: [
    NotificationIconComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotificationIconComponent,
      }
    ])
  ]
})
export class NotificationIconModule { }
