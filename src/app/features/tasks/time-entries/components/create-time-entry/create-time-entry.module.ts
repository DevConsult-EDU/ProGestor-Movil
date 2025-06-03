import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateTimeEntryComponent} from "./create-time-entry.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [CreateTimeEntryComponent],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: CreateTimeEntryComponent,
      }
    ])
  ]
})
export class CreateTimeEntryModule { }
