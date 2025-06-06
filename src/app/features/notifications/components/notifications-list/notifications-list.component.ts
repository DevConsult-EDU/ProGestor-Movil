import {Component, inject, Inject, OnInit} from '@angular/core';
import {ProjectLayoutComponent} from "../../../../project-layout/project-layout.component";
import {
  MarkNotificationAsReadService
} from "../../services/mark-notification-as-read-service/mark-notification-as-read.service";
import {UserListed} from "../../../../shared/interfaces/userListed.interface";
import {NotificationsListed} from "../../../../shared/interfaces/notifications-listed";
import {
  MarkAllNotificationsAsReadService
} from "../../services/mark-all-notifications-as-read-service/mark-all-notifications-as-read.service";
import {NotificationsListService} from "../../services/notifications-list-service/notifications-list.service";
import {UserListService} from "../../../users/services/user-list-service/user-list.service";
import {ActivatedRoute} from "@angular/router";
import {AlertController, LoadingController, RefresherCustomEvent, ToastController} from "@ionic/angular";
import {forkJoin, tap, timer} from "rxjs";

@Component({
  selector: 'app-notifications-list',
  standalone: false,
  templateUrl: '../../pages/notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent  implements OnInit {

  public users = [] as UserListed[];
  public notifications = [] as NotificationsListed[];
  public isLoading: boolean = true;

  notificationsListService = inject(NotificationsListService);
  markAsReadService = inject(MarkNotificationAsReadService);
  markAllAsReadService = inject(MarkAllNotificationsAsReadService);
  userListService = inject(UserListService);
  activatedRoute = inject(ActivatedRoute);
  toastController = inject(ToastController);
  loadController = inject(LoadingController);
  alertController = inject(AlertController);

  userId = this.activatedRoute.snapshot.params['idUser'];


  constructor(@Inject(ProjectLayoutComponent) protected parent: ProjectLayoutComponent) {

  }

  ngOnInit() {

    this.parent.titulo = 'Notificaciones';

    this.getNotifications();

    this.userListService.invoke().subscribe((response: UserListed[]) => {
      this.users = response;
    })

    this.notifications = this.notifications.map(notification => ({
      ...notification,
      isExpanded: notification.isExpanded || false
    }));

  }

  toggleNotification(notification: NotificationsListed): void {
    notification.isExpanded = !notification.isExpanded;

    if (notification.isExpanded && !notification.read) {
      this.markAsRead(notification.id, true);
    }
  }


  public getNotifications(event?: RefresherCustomEvent) {
    this.isLoading = true;

    // 1. Definimos el tiempo mínimo de espera.
    const minimumTime = timer(2000);

    // 2. Definimos la llamada a la API como un observable.
    const apiCall = this.notificationsListService.invoke(this.userId);

    // 3. Usamos forkJoin para esperar a que ambos se completen.
    forkJoin([apiCall, minimumTime]).subscribe({
      next: ([response]) => {
        this.notifications = response;
        this.isLoading = false;
        if (event) {
          event.target.complete();
        }
      },
      error: async (errorResponse) => {

        const toaster = await this.toastController.create({
          message: 'Error al cargar las notificaciones',
          position: 'bottom',
          duration: 3000,
          color: 'danger',
        });
        await toaster.present();
        this.isLoading = false;
        if (event) {
          await event.target.complete();
        }
      }
    });
  }

  handleRefresh(event: RefresherCustomEvent) {
    console.log('Refrescando notificaciones...');
    this.getNotifications(event);

  }

  public markAsRead(id: string, fromToggle: boolean = false) {

    const notification = this.notifications.find(n => n.id === id);

    if (!notification || notification.read) {
      return;
    }
    const originalReadState = notification.read;

    // 1. Actualización Optimista: cambia el estado en la UI inmediatamente
    notification.read = true;
    if (!fromToggle && notification.isExpanded) {
      notification.isExpanded = false;
    }

    // 2. Llama al servicio en segundo plano
    this.markAsReadService.invoke(id).subscribe({
      next: (result) => {
        console.log(`Notificación ${id} marcada como leída en el servidor.`);
      },
      error: async (errorResponse) => {
        const toaster = await this.toastController.create({
          message: 'Error al marcar la notificación como leída.',
          position: 'bottom',
          duration: 3000,
          color: 'danger',
        });
        await toaster.present();

        notification.read = originalReadState;
      }
    });
  }



  public async markAllAsRead(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que quieres marcar todas las notificaciones como leídas?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Operación cancelada');
          }
        },
        {
          text: 'Aceptar',
          handler: async () => {
            await this.executeMarkAllAsRead(id);
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Función auxiliar que contiene la lógica de carga y la llamada a la API.
   * Esto mantiene el código más limpio.
   */
  private async executeMarkAllAsRead(id: string) {
    const loading = await this.loadController.create({
      message: 'Marcando todas como leídas...',
      spinner: 'circles',
    });
    await loading.present();

    this.markAllAsReadService.invoke(id).subscribe({
      next: (result) => {
        loading.dismiss();
        this.getNotifications();
      },
      error: async (errorResponse) => {
        await loading.dismiss();
        console.log(errorResponse);
        const toaster = await this.toastController.create({
          message: 'Error al marcar las notificaciones como leídas',
          position: 'bottom',
          duration: 3000,
          color: 'danger',
        });
        await toaster.present();
      }
    });
  }

}
