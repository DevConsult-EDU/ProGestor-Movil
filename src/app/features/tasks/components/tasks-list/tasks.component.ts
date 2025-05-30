import { Component, inject, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TaskListed} from "../../../../shared/interfaces/taskListed.interface";
import {ProjectListed} from "../../../../shared/interfaces/projectListed.interface";
import {UserListed} from "../../../../shared/interfaces/userListed.interface";
import {ProjectListService} from "../../../projects/services/project-list-service/project-list.service";
import {TaskListService} from "../../services/task-list-service/task-list.service";
import {UserListService} from "../../../users/services/user-list-service/user-list.service";

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: '../../pages/tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent  implements OnInit {

  public rol: string|null;
  public tasks = [] as TaskListed[];
  public projects = [] as ProjectListed[];
  public users = [] as UserListed[];

  projectListService = inject(ProjectListService);
  taskListService = inject(TaskListService);
  userListService = inject(UserListService);

  router = inject(Router)

  constructor() {
    this.rol = localStorage.getItem('rol');
  }

  ngOnInit() {

    this.taskListService.invoke().subscribe((response: TaskListed[]) => {
      this.tasks = response;
    })

    this.projectListService.invoke().subscribe((response: ProjectListed[]) => {
      this.projects = response;
    })

    this.userListService.invoke().subscribe((response: UserListed[]) => {
      this.users = response;
    })

  }

  navigateCreateTask() {
    this.router.navigate(['auth/tasks/createTask']);
  }

  navigateDetailsTask(id: string) {
    this.router.navigate(['auth/tasks', id]);
  }

}
