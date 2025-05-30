import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserPendingTasksComponent} from "./user-pending-tasks.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [UserPendingTasksComponent],
  exports: [
    UserPendingTasksComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class UserPendingTasksModule { }
