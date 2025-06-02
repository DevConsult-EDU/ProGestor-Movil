import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateProjectComponent} from "./create-project.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [CreateProjectComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateProjectComponent,
      }
    ]),
    ReactiveFormsModule
  ]
})
export class CreateProjectModule { }
