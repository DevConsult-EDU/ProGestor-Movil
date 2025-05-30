import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainDashboardComponent} from "./main-dashboard.component";
import {RouterModule} from "@angular/router";
import {RecentActivitiesModule} from "../components/recent-activities/recent-activities.module";
import {UserPendingTasksModule} from "../components/user-pending-tasks/user-pending-tasks.module";
import {UserActiveProjectsModule} from "../components/user-active-projects/user-active-projects.module";
import {IonicModule} from "@ionic/angular";


@NgModule({
  declarations: [MainDashboardComponent],
  imports: [
    CommonModule,
    RecentActivitiesModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainDashboardComponent,
      }
    ]),
    UserPendingTasksModule,
    UserActiveProjectsModule,
    IonicModule,

  ]
})
export class MainDashboardModule { }
