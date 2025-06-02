import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import { TaskDetailsComponent } from './task-details.component';



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
    ])
  ]
})
export class TaskDetailsModule { }
