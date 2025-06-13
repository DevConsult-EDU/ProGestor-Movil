import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainDashboardComponent} from "./main-dashboard.component";
import {RouterModule} from "@angular/router";
import {RecentActivitiesModule} from "../components/recent-activities/recent-activities.module";
import {UserPendingTasksModule} from "../components/user-pending-tasks/user-pending-tasks.module";
import {UserActiveProjectsModule} from "../components/user-active-projects/user-active-projects.module";
import {IonicModule} from "@ionic/angular";
import {AiSummaryWidgetModule} from "../components/ai-summary-widget/ai-summary-widget.module";
import {TasksAiAnalysisModule} from "../components/tasks-ai-analysis/tasks-ai-analysis.module";
import {AiChatSuggestionsModule} from "../../tasks/components/ai-chat-suggestions/ai-chat-suggestions.module";


@NgModule({
  declarations: [MainDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: MainDashboardComponent,
      }
    ]),
    UserPendingTasksModule,
    UserActiveProjectsModule,
    RecentActivitiesModule,
    AiSummaryWidgetModule,
    IonicModule,
    TasksAiAnalysisModule,
    AiChatSuggestionsModule,

  ]
})
export class MainDashboardModule { }
