import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {NotificationsListComponent} from "./notifications-list.component";



@NgModule({
  declarations: [NotificationsListComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: NotificationsListComponent,
      }
    ])
  ]
})
export class NotificationsListModule { }
