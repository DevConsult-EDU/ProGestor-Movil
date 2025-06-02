import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateTaskComponent} from "./create-task.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [CreateTaskComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateTaskComponent,
      }
    ]),
    ReactiveFormsModule
  ]
})
export class CreateTaskModule { }
