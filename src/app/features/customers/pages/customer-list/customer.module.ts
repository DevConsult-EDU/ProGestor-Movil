import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerComponent} from "./customer.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomerComponent,
      }
    ])
  ]
})
export class CustomerModule { }
