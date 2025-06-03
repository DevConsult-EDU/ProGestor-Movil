import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import { TaskDetailsComponent } from './task-details.component';
import {AttachmentsListModule} from "../../attachments/components/attachments-list/attachments-list.module";



@NgModule({
  declarations: [TaskDetailsComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TaskDetailsComponent,
      }
    ]),
  ]
})
export class TaskDetailsModule { }
