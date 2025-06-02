import { Component, inject, OnInit } from '@angular/core';
import { UserListed } from 'src/app/shared/interfaces/userListed.interface';
import {Router} from "@angular/router";
import {TaskListed} from "../../../../shared/interfaces/taskListed.interface";
import {ProjectListed} from "../../../../shared/interfaces/projectListed.interface";
import {UserListService} from "../../../users/services/user-list-service/user-list.service";
import {UserPendingTasksService} from "../../services/user-pending-tasks-service/user-pending-tasks.service";
import {ProjectListService} from "../../../projects/services/project-list-service/project-list.service";

@Component({
  selector: 'app-user-pending-tasks',
  standalone: false,
  templateUrl: './user-pending-tasks.component.html',
  styleUrls: ['./user-pending-tasks.component.scss'],
})
export class UserPendingTasksComponent  implements OnInit {

  public rol: string|null;
  public tasks = [] as TaskListed[];
  public projects = [] as ProjectListed[];
  public users = [] as UserListed[];

  projectListService = inject(ProjectListService);
  userListService = inject(UserListService);
  userPendingTasksService = inject(UserPendingTasksService);

  router = inject(Router)

  constructor() {
    this.rol = localStorage.getItem('rol');
  }

  navigateTask() {
    this.router.navigate(['/tasks']);
  }

  ngOnInit() {

    this.userPendingTasksService.invoke().subscribe((response: TaskListed[]) => {
      this.tasks = response;
    })

    this.projectListService.invoke().subscribe((response: ProjectListed[]) => {
      this.projects = response;
    })

    this.userListService.invoke().subscribe((response: UserListed[]) => {
      this.users = response;
    })

  }

}
