import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UpdateUserComponent} from "./update-user.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [UpdateUserComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: UpdateUserComponent,
      }
    ]),
    ReactiveFormsModule
  ]
})
export class UpdateUserModule { }
