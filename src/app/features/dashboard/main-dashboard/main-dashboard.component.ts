import {Component, Inject, OnInit} from '@angular/core';
import {ProjectLayoutComponent} from "../../../project-layout/project-layout.component";

@Component({
  selector: 'app-main-dashboard',
  standalone: false,
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss'],
})
export class MainDashboardComponent implements OnInit {
  constructor(@Inject(ProjectLayoutComponent) private parent: ProjectLayoutComponent) {
  }

  ngOnInit() {
    this.parent.titulo = 'Dashboard';
  }


}
