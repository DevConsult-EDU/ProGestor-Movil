import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UpdateTaskComponent} from "./update-task.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [UpdateTaskComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: "",
        component: UpdateTaskComponent,
      }
    ]),
    ReactiveFormsModule
  ]
})
export class UpdateTaskModule { }
