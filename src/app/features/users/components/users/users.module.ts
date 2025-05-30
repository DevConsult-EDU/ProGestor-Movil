import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersComponent} from "./users.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: UsersComponent,
      }
    ])
  ]
})
export class UsersModule { }
