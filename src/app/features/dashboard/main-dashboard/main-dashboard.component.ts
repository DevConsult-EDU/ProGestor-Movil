import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {ProjectLayoutComponent} from "../../../project-layout/project-layout.component";
import {UserActiveProjectsComponent} from "../components/user-active-projects/user-active-projects.component";
import {UserPendingTasksComponent} from "../components/user-pending-tasks/user-pending-tasks.component";
import {AiSummaryWidgetComponent} from "../components/ai-summary-widget/ai-summary-widget.component";
import {RecentActivitiesComponent} from "../components/recent-activities/recent-activities.component";

@Component({
  selector: 'app-main-dashboard',
  standalone: false,
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
})
export class MainDashboardComponent implements OnInit {

  public isLoading: boolean = false;
  public isAiSuggestion: boolean = false;
  public rol: string|null;

  constructor(@Inject(ProjectLayoutComponent) private parent: ProjectLayoutComponent) {
    this.rol = localStorage.getItem("rol");
  }

  ngOnInit() {

    this.parent.titulo = 'Dashboard';

  }

  toggleAiSuggestion() {
    this.isAiSuggestion = !this.isAiSuggestion;
  }


}
