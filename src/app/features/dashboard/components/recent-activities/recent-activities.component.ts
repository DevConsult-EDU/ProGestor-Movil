import {Component, inject, OnInit} from '@angular/core';
import { CommentsListed } from 'src/app/shared/interfaces/comments-listed';
import {UserListed} from "../../../../shared/interfaces/userListed.interface";
import {TaskListed} from "../../../../shared/interfaces/taskListed.interface";
import {RecentActivitiesService} from "../../services/recent-activities-service/recent-activities.service";
import {UserListService} from "../../../users/services/user-list-service/user-list.service";
import {TaskListService} from "../../../tasks/services/task-list-service/task-list.service";


@Component({
  selector: 'app-recent-activities',
  standalone: false,
  templateUrl: './recent-activities.component.html',
  styleUrls: ['./recent-activities.component.scss'],
})
export class RecentActivitiesComponent  implements OnInit {

  public rol: string|null;
  public comments: CommentsListed[] = [];
  public users: UserListed[] = [];
  public tasks: TaskListed[] = [];


  recentActivitiesService = inject(RecentActivitiesService);
  userListService = inject(UserListService);
  taskListService = inject(TaskListService);

  constructor() {
    this.rol = localStorage.getItem('rol');
  }

  ngOnInit() {
    this.getUsers();
    this.getTasks();
    if (this.comments.length === 0) {
      this.getComments();
    }
  }

  public getUsers(): void {
    this.userListService.invoke().subscribe({
      next: (response: UserListed[]) => {
        this.users = response;
      },
      error: (err) => console.error('Error fetching users:', err)
    });
  }

  public getTasks(): void {
    this.taskListService.invoke().subscribe({
      next: (response: TaskListed[]) => {
        this.tasks = response;
      },
      error: (err) => console.error('Error fetching tasks:', err)
    });
  }

  public getComments(): void {
    this.recentActivitiesService.invoke().subscribe({
      next: (response: CommentsListed[]) => {
        if (response && response.length > 0) {
          this.comments = response.sort((a, b) => {

            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return dateB - dateA;
          });
        } else {
          this.comments = [];
        }
      },
      error: (err) => {
        console.error('Error fetching comments:', err);
        this.comments = [];
      }
    });
  }

  public getUserName(userId: string | number): string {
    if (!this.users || this.users.length === 0) {
      return 'Cargando...';
    }

    const user = this.users.find(u => String(u.id) === String(userId));
    return user ? user.name : 'Usuario Desconocido';
  }

  public getTaskTitle(taskId: string | number): string {
    if (!this.tasks || this.tasks.length === 0) {
      return 'Cargando...';
    }

    const task = this.tasks.find(t => String(t.id) === String(taskId));
    return task ? task.title : 'Tarea Desconocida';
  }

}
