import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import { TaskDetailsComponent } from './task-details.component';
import {AttachmentsListModule} from "../../attachments/components/attachments-list/attachments-list.module";
import {FormsModule} from "@angular/forms";
import {TimeEntriesListModule} from "../../time-entries/components/time-entries-list/time-entries-list.module";



@NgModule({
  declarations: [TaskDetailsComponent],
  imports: [
    TimeEntriesListModule,
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: TaskDetailsComponent,
      },

    ]),
    FormsModule,

  ],
})
export class TaskDetailsModule { }
