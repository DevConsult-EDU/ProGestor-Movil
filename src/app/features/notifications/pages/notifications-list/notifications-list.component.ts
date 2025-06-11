import {ChangeDetectorRef, Component, inject, Inject, OnInit} from '@angular/core';
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
import {
  AlertController,
  LoadingController, MenuController,
  ModalController,
  RefresherCustomEvent,
  ToastController
} from "@ionic/angular";
import {forkJoin, map, Observable, tap, timer} from "rxjs";
import {FilterPreferenceService} from "../../services/filter-preferences-service/filter-preferences.service";
import {
  NotificationFiltersModalComponent
} from "../../components/notification-filters-modal/notification-filters-modal.component";

@Component({
  selector: 'app-notifications-list',
  standalone: false,
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent  implements OnInit {

  public users = [] as UserListed[];
  public notifications = [] as NotificationsListed[];
  public isLoading: boolean = true;
  private currentPage = 1;
  private readonly pageSize = 20;
  public hasMoreData = true;
  public activeFilters: string[] = [];
  public isProgrammaticRefresh = false;

  notificationsListService = inject(NotificationsListService);
  markAsReadService = inject(MarkNotificationAsReadService);
  markAllAsReadService = inject(MarkAllNotificationsAsReadService);
  userListService = inject(UserListService);
  activatedRoute = inject(ActivatedRoute);
  toastController = inject(ToastController);
  loadController = inject(LoadingController);
  alertController = inject(AlertController);
  modalController = inject(ModalController);
  filterPreferencesService = inject(FilterPreferenceService);
  cdr = inject(ChangeDetectorRef);
  menuCtrl = inject(MenuController);

  userId = this.activatedRoute.snapshot.params['idUser'];


  constructor(@Inject(ProjectLayoutComponent) protected parent: ProjectLayoutComponent) {

  }

  async ngOnInit() {

    this.parent.titulo = 'Notificaciones';

    this.userListService.invoke().subscribe((response: UserListed[]) => {
      this.users = response;
    })

    this.notifications = this.notifications.map(notification => ({
      ...notification,
      isExpanded: notification.isExpanded || false
    }));

    this.activeFilters = await this.filterPreferencesService.loadFilters();
    this.getNotifications(true);

  }

  toggleNotification(notification: NotificationsListed): void {
    notification.isExpanded = !notification.isExpanded;

    if (notification.isExpanded && !notification.read) {
      this.markAsRead(notification.id, true);
    }
  }


  public getNotifications(isInitialLoad: boolean = false, event?: any) {
    if (isInitialLoad) {
      this.currentPage = 1;

      this.hasMoreData = true;
      this.isLoading = true;
    }

    const apiCall = this.notificationsListService.
    invoke(this.userId, this.currentPage, this.pageSize, this.activeFilters);

    let finalObservable: Observable<NotificationsListed[]>;

    if (isInitialLoad) {
      const minimumTime = timer(2000);
      finalObservable = forkJoin([apiCall, minimumTime]).pipe(
        map(([apiResponse, timerResult]) => apiResponse)
      );
    } else {

      finalObservable = apiCall;
    }

    finalObservable.subscribe({
      next: (newNotifications: NotificationsListed[]) => {
        this.notifications.push(...newNotifications.map(n => ({ ...n, isExpanded: false })));
        if (newNotifications.length < this.pageSize) {
          this.hasMoreData = false;
        }
        if (event) {
          event.target.complete();
        }
        this.isLoading = false;
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

  async openFilterModal() {
    const modal = await this.modalController.create({
      component: NotificationFiltersModalComponent,
      componentProps: {
        currentFilters: this.activeFilters
      }
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();

    if (role === 'apply') {
      this.activeFilters = data;

      await this.filterPreferencesService.saveFilters(this.activeFilters);
      this.getNotifications(true);
    }
  }

  handleRefresh(event: RefresherCustomEvent) {
    console.log('Refrescando notificaciones...');
    this.getNotifications(true, event);

  }

  loadMore(event: any) {
    if (!this.hasMoreData) {
      event.target.complete();
      return;
    }

    this.currentPage++;
    console.log(`Cargando página ${this.currentPage}...`);
    this.getNotifications(false, event);
  }


  public markAsRead(id: string, fromToggle: boolean = false) {

    const notification = this.notifications.find(n => n.id === id);

    if (!notification || notification.read) {
      return;
    }
    const originalReadState = notification.read;

    notification.read = true;
    if (!fromToggle && notification.isExpanded) {
      notification.isExpanded = false;
    }

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

  private async executeMarkAllAsRead(id: string) {

    const loading = await this.loadController.create({
      message: 'Actualizando...',
    });
    await loading.present();

    const originalNotifications = JSON.parse(JSON.stringify(this.notifications));

    this.notifications.forEach(notification => {
      notification.read = true;
    });

    this.cdr.detectChanges();

    this.markAllAsReadService.invoke(id).subscribe({
      next: async (result) => {

        console.log('Backend actualizado correctamente.');
        await loading.dismiss();
      },
      error: async (errorResponse) => {

        console.error('Error al actualizar el backend, revirtiendo UI.', errorResponse);

        this.notifications = originalNotifications;
        this.cdr.detectChanges();

        await loading.dismiss();

        const toaster = await this.toastController.create({
          message: 'No se pudieron marcar las notificaciones.',
          duration: 3000,
          color: 'danger',
        });
        await toaster.present();
      }
    });
  }

  ionViewWillEnter() {

    this.menuCtrl.enable(true, 'main-menu');
  }



}
