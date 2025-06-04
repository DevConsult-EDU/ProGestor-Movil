import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TimeEntriesListComponent} from "./time-entries-list.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [TimeEntriesListComponent],
  exports: [
    TimeEntriesListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
  ]
})
export class TimeEntriesListModule { }
