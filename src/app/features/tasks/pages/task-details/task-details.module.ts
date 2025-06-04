import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import { TaskDetailsComponent } from './task-details.component';
import {AttachmentsListModule} from "../../attachments/pages/attachments-list/attachments-list.module";
import {FormsModule} from "@angular/forms";
import {TimeEntriesListModule} from "../../time-entries/pages/time-entries-list/time-entries-list.module";
import {CommentsListModule} from "../../comments/pages/comments-list/comments-list.module";



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
    CommentsListModule,

  ],
})
export class TaskDetailsModule { }
