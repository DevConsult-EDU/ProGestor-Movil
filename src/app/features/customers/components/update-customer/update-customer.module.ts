import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UpdateCustomerComponent} from "./update-customer.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [UpdateCustomerComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: UpdateCustomerComponent,
      }
    ]),
    ReactiveFormsModule
  ]
})
export class UpdateCustomerModule { }
