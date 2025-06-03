import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UpdateProjectComponent} from "./update-project.component";
import {IonicModule} from "@ionic/angular";
import { RouterModule } from '@angular/router';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [UpdateProjectComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: UpdateProjectComponent,
      }
    ]),
    ReactiveFormsModule
  ]
})
export class UpdateProjectModule { }
