import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {RegisterPageComponent} from "./register-page.component";




@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    ReactiveFormsModule,
    RouterLink,
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterPageComponent
      }
    ]),
  ]
})
export class RegisterPageModule { }
