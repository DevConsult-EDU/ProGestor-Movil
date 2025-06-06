import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {NotificationsListComponent} from "./notifications-list.component";
import {TimeAgoPipe} from "../../../../shared/pipes/time-ago.pipe";



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
    ]),
    TimeAgoPipe
  ]
})
export class NotificationsListModule { }
