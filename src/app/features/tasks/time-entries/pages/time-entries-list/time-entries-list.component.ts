import {Component, inject, Input, OnInit} from '@angular/core';
import { TimeEntriesListed } from 'src/app/shared/interfaces/time-entries-listed';
import { UserListed } from 'src/app/shared/interfaces/userListed.interface';
import {TimeEntriesListService} from "../../services/time-entries-list-service/time-entries-list.service";
import {UserListService} from "../../../../users/services/user-list-service/user-list.service";
import {Router} from "@angular/router";
import {UpdateTimeEntryComponent} from "../../components/update-time-entry/update-time-entry.component";
import {ModalController, ToastController} from "@ionic/angular";
import {TimeEntry} from "../../../../../shared/interfaces/time-entry";
import {DeleteTimeEntryService} from "../../services/delete-time-entry-service/delete-time-entry.service";

@Component({
  selector: 'app-time-entries-list',
  standalone: false,
  templateUrl: './time-entries-list.component.html',
  styleUrls: ['./time-entries-list.component.scss'],
})
export class TimeEntriesListComponent  implements OnInit {

  public users = [] as UserListed[];
  public timeEntries = [] as TimeEntriesListed[];
  public _taskId!: string;
  public rol: string | null;
  public name: string | null;

  //@ViewChild (UpdateTimeEntryComponent) private updateTimeEntryComponent!: UpdateTimeEntryComponent;

  @Input()
  set taskId(taskId: string) {
    this._taskId = taskId;
  }

  timeEntriesListService = inject(TimeEntriesListService);
  userListService = inject(UserListService);
  router = inject(Router)
  deleteTimeEntryService = inject(DeleteTimeEntryService);

  constructor(private modalCtrl: ModalController,
              private toastController: ToastController) {
    this.rol = localStorage.getItem('rol');
    this.name = localStorage.getItem('name');
  }

  ngOnInit() {

    this.getTimeEntries();

    this.userListService.invoke().subscribe((response: UserListed[]) => {
      this.users = response;
    })

  }

  public getTimeEntries() {
    this.timeEntriesListService.invoke(this._taskId).subscribe((response: TimeEntriesListed[]) => {
      this.timeEntries = response;
    })
  }

  async openModalEdit(timeEntryId: string) {

    console.log('ID de la entrada de tiempo a editar:', timeEntryId);

    const modal = await this.modalCtrl.create({
      component: UpdateTimeEntryComponent,
      componentProps: {
        taskId: this.taskId,
        timeEntryId: timeEntryId,
      }
    });
    await modal.present();

    const {data, role} = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.getTimeEntries();
    }
  }

  public getUserName(userId: string | number): string {
    if (!this.users || this.users.length === 0) {
      return 'Cargando...';
    }

    const user = this.users.find(u => String(u.id) === String(userId));
    return user ? user.name : 'Usuario Desconocido';
  }

  deleteTimeEntry(id: string) {

    const confirmDelete = window.confirm('¿Estas seguro de que deseas eliminar esta entrada de tiempo?');

    if (confirmDelete) {
      this.deleteTimeEntryService.deleteTimeEntry(id)
        .subscribe({
          next: async () => {
            const toaster = await this.toastController.create({
              message: 'Entrada de tiempo borrada correctamente',
              position: 'bottom',
              duration: 3000,
              color: 'success',
            })
            await toaster.present();
            window.location.reload();
          },
          error: async (error) => {
            const toaster = await this.toastController.create({
              message: 'Error al borrar la entrada de tiempo',
              position: 'bottom',
              duration: 3000,
              color: 'danger',
            })
            await toaster.present();
          }
        });
    }
  }
}
