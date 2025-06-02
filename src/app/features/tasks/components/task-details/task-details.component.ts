import {Component, inject, OnInit} from '@angular/core';
import {TaskDetailsService} from "../../services/task-details-service/task-details.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteTaskService} from "../../services/delete-task-service/delete-task.service";
import {Task} from "../../../../shared/interfaces/task.interface";


@Component({
  selector: 'app-task-details',
  standalone: false,
  templateUrl: '../../pages/task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent  implements OnInit {

  public rol: string|null;

  activatedRoute = inject(ActivatedRoute)

  public task: Task = {} as Task;

  public taskId = this.activatedRoute.snapshot.params['idTask'];

  taskDetailsService = inject(TaskDetailsService);
  deleteTaskService = inject(DeleteTaskService)
  //modalService = inject(ModalService)

  router = inject(Router)

  constructor() {
    this.rol = localStorage.getItem('rol');
  }


  ngOnInit() {

    this.taskDetailsService.invoke(this.taskId).subscribe({
      next: result => {

        this.task = result;
      }
    })
  }

  navigateUpdateTask() {
    this.router.navigate(['/tasks/updateTask/' + this.taskId]);
  }

  executeDeleteTask() {
    const confirmDelete = window.confirm('¿Estas seguro de que deseas eliminar esta tarea?');

    if (confirmDelete) {
      this.deleteTaskService.deleteTask(this.taskId)
        .subscribe({
          next: () => {
            this.router.navigate(['/tasks']);
          },
          error: (error) => {
            console.error('Error al eliminar tarea:', error);
          }
        });
    }
  }

  // public openCreateAttachmentModal(): void {
  //   const modalRef = this.modalService.loadComponent(CreateAttachmentsComponent);
  //   modalRef.instance.taskId = this.taskId;
  //   this.modalService.setTitulo('Subir nuevo archivo');
  //   this.modalService.onDidDismiss$.subscribe({
  //     next: (data) => {
  //       if (data) {
  //
  //
  //       }
  //     }
  //   })
  // }

}
