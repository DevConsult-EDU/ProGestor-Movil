import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecentActivitiesComponent} from "./recent-activities.component";
import {RouterModule} from "@angular/router";
import {IonicModule} from "@ionic/angular";
import {TimeAgoPipe} from "../../../../shared/pipes/time-ago.pipe";



@NgModule({
  declarations: [RecentActivitiesComponent],
  exports: [
    RecentActivitiesComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TimeAgoPipe
  ]
})
export class RecentActivitiesModule { }
