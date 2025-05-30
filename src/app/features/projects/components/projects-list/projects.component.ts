import {Component, inject, OnInit} from '@angular/core';
import {ProjectListService} from "../../services/project-list-service/project-list.service";
import {CustomerListService} from "../../../customers/services/customer-list-service/customer-list.service";
import {ProjectListed} from "../../../../shared/interfaces/projectListed.interface";
import {CustomerListed} from "../../../../shared/interfaces/customerListed.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: '../../pages/projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent  implements OnInit {

  public rol: string|null;
  projectListService = inject(ProjectListService);
  customerListService = inject(CustomerListService);
  public projects = [] as ProjectListed[];
  public customers = [] as CustomerListed[];
  router = inject(Router)

  constructor() {
    this.rol = localStorage.getItem('rol');
  }

  ngOnInit() {

    this.projectListService.invoke().subscribe((response: ProjectListed[]) => {
      this.projects = response;
    })

    this.customerListService.invoke().subscribe((response: CustomerListed[]) => {
      this.customers = response;
    })

  }

  navigateDetailsProject(id: string) {
    this.router.navigate(['auth/projects', id]);
  }

  navigateCreateProject() {
    this.router.navigate(['auth/projects/createProject']);
  }

}
