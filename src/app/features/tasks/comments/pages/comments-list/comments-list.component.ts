import {Component, inject, Input, OnInit} from '@angular/core';
import {CommentsListed} from "../../../../../shared/interfaces/comments-listed";
import {UserListed} from "../../../../../shared/interfaces/userListed.interface";
import {CommentsListService} from "../../services/comments-list-service/comments-list.service";
import {UserListService} from "../../../../users/services/user-list-service/user-list.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-comments-list',
  standalone: false,
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.scss'],
})
export class CommentsListComponent  implements OnInit {

  public rol: string|null;
  public name: string|null;
  public comments: CommentsListed[] = [];
  public users: UserListed[] = [];
  public _taskId!: string;

  @Input()
  set taskId(taskId: string) {
    this._taskId = taskId;
    if (this._taskId) {
      this.getComments();
    }
  }

  commentsListService = inject(CommentsListService);
  userListService = inject(UserListService);
  //deleteCommentService = inject(DeleteCommentService);
  router = inject(Router);

  constructor() {
    this.rol = localStorage.getItem('rol');
    this.name = localStorage.getItem('name');
  }

  ngOnInit() {
    this.getUsers();
    if (this._taskId && this.comments.length === 0) {
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

  public getComments(): void {
    if (!this._taskId) return;
    this.commentsListService.invoke(this._taskId).subscribe({
      next: (response: CommentsListed[]) => {
        if (response && response.length > 0) {
          this.comments = response.sort((a, b) => {

            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return dateA - dateB;
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

  // deleteComment(id: string) {
  //
  //   const confirmDelete = window.confirm('¿Estas seguro de que deseas eliminar este comentario?');
  //
  //   if (confirmDelete) {
  //     this.deleteCommentService.deleteComment(id)
  //       .subscribe({
  //         next: () => {
  //           window.location.reload();
  //         },
  //         error: (error) => {
  //           console.error('Error al eliminar el comentario:', error);
  //         }
  //       });
  //   }
  //
  // }

}
