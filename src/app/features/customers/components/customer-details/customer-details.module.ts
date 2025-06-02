import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CustomerDetailsComponent} from "./customer-details.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [CustomerDetailsComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomerDetailsComponent,
      }
    ])
  ]
})
export class CustomerDetailsModule { }
