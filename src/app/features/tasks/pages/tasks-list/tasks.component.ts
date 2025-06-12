import {Component, Inject, inject, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {TaskListed} from "../../../../shared/interfaces/taskListed.interface";
import {ProjectListed} from "../../../../shared/interfaces/projectListed.interface";
import {UserListed} from "../../../../shared/interfaces/userListed.interface";
import {ProjectListService} from "../../../projects/services/project-list-service/project-list.service";
import {TaskListService} from "../../services/task-list-service/task-list.service";
import {UserListService} from "../../../users/services/user-list-service/user-list.service";
import {ProjectLayoutComponent} from "../../../../project-layout/project-layout.component";

@Component({
  selector: 'app-tasks',
  standalone: false,
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent  implements OnInit {

  public rol: string|null;
  public tasks = [] as TaskListed[];
  public projects = [] as ProjectListed[];
  public users = [] as UserListed[];
  public isAiSuggestion: boolean = false;


  projectListService = inject(ProjectListService);
  taskListService = inject(TaskListService);
  userListService = inject(UserListService);

  router = inject(Router)

  constructor(@Inject(ProjectLayoutComponent) private parent: ProjectLayoutComponent) {
    this.rol = localStorage.getItem('rol');
  }

  ngOnInit() {

    this.parent.titulo = 'Tareas';

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

  toggleAiSuggestion() {
    this.isAiSuggestion = !this.isAiSuggestion;
  }

  navigateCreateTask() {
    this.router.navigate(['tasks/createTask']);
  }

  navigateDetailsTask(id: string) {
    this.router.navigate(['tasks', id]);
  }

}
