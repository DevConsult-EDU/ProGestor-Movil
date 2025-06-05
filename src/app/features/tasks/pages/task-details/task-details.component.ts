import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {TaskDetailsService} from "../../services/task-details-service/task-details.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeleteTaskService} from "../../services/delete-task-service/delete-task.service";
import {Task} from "../../../../shared/interfaces/task.interface";
import {ModalController} from "@ionic/angular";
import {CreateTimeEntryComponent} from "../../time-entries/components/create-time-entry/create-time-entry.component";
import {TimeEntriesListComponent} from "../../time-entries/pages/time-entries-list/time-entries-list.component";
import {UpdateTimeEntryComponent} from "../../time-entries/components/update-time-entry/update-time-entry.component";

@Component({
  selector: 'app-task-details',
  standalone: false,
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent  implements OnInit {
  @ViewChild(TimeEntriesListComponent) timeEntriesListComponent!: TimeEntriesListComponent;
  public rol: string|null;
  selectedSegment: string = 'tiempo';
  public total_time!: string;

  activatedRoute = inject(ActivatedRoute)

  public task: Task = {} as Task;

  public taskId = this.activatedRoute.snapshot.params['idTask'];

  taskDetailsService = inject(TaskDetailsService);
  deleteTaskService = inject(DeleteTaskService)

  router = inject(Router)

  constructor(private modalCtrl: ModalController) {
    this.rol = localStorage.getItem('rol');
  }


  ngOnInit() {

    this.taskDetailsService.invoke(this.taskId).subscribe({
      next: result => {

        this.task = result;
        if (this.task && typeof this.task.totalTime !== 'undefined') {
          this.total_time = this.formatMinutesToHoursAndMinutes(this.task.totalTime);
        } else {
          this.total_time = this.formatMinutesToHoursAndMinutes(null);
        }
      }

    })

  }

  formatMinutesToHoursAndMinutes(totalMinutes: number | null | undefined): string {
    if (totalMinutes === null || totalMinutes === undefined || isNaN(totalMinutes) || totalMinutes < 0) {
      return "0h 0min";
    }
    if (totalMinutes === 0) {
      return "0h 0min";
    }
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    let result = "";
    if (hours > 0) {
      result += `${hours}h`;
    }
    if (minutes > 0) {
      if (hours > 0) {
        result += " ";
      }
      result += `${minutes}min`;
    }
    if (result === "") {
      return "0min";
    }
    return result;
  }

  async openModalCreate() {
    const modal = await this.modalCtrl.create({
      component: CreateTimeEntryComponent,
      componentProps: {
        taskId: this.taskId,
      }
    });
    await modal.present();

    const {data, role} = await modal.onWillDismiss();

    if(role === 'confirm') {
      this.timeEntriesListComponent.getTimeEntries();
    }

    this.ngOnInit();

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
