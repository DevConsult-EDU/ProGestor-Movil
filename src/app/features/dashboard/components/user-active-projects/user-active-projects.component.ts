import {Component, inject, OnInit} from '@angular/core';
import { CustomerListed } from 'src/app/shared/interfaces/customerListed.interface';
import { ProjectListed } from 'src/app/shared/interfaces/projectListed.interface';
import {TaskListed} from "../../../../shared/interfaces/taskListed.interface";
import {Router} from "@angular/router";
import {UserActiveProjectsService} from "../../services/user-active-projects-service/user-active-projects.service";
import {CustomerListService} from "../../../customers/services/customer-list-service/customer-list.service";

@Component({
  selector: 'app-user-active-projects',
  standalone: false,
  templateUrl: './user-active-projects.component.html',
  styleUrls: ['./user-active-projects.component.scss'],
})
export class UserActiveProjectsComponent  implements OnInit {

  public rol: string|null;
  public percentage!: number;
  activeProjectsService = inject(UserActiveProjectsService);
  customerListService = inject(CustomerListService);
  public projects = [] as ProjectListed[];
  public customers = [] as CustomerListed[];
  public tasks = [] as TaskListed[];
  router = inject(Router)

  constructor() {
    this.rol = localStorage.getItem('rol');
  }

  getPercentage(i: number, j: number) {

    if(i == 0 || j == 0){
      return this.percentage = 0;
    } else {

      this.percentage = i / j * 100;

      this.percentage = Math.round(this.percentage);
    }
    return this.percentage;

  }

  ngOnInit() {

    this.activeProjectsService.invoke().subscribe((response: ProjectListed[]) => {
      this.projects = response;
    })

    this.customerListService.invoke().subscribe((response: CustomerListed[]) => {
      this.customers = response;
    })

  }

}
