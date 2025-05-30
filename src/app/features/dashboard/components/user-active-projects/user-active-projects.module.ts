import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserActiveProjectsComponent} from "./user-active-projects.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [UserActiveProjectsComponent],
  exports: [
    UserActiveProjectsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class UserActiveProjectsModule { }
