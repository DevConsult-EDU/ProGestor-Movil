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

@Component({
  selector: 'app-notifications-list',
  standalone: false,
  templateUrl: '../../pages/notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent  implements OnInit {

  public users = [] as UserListed[];
  public notifications = [] as NotificationsListed[];

  notificationsListService = inject(NotificationsListService);
  markAsReadService = inject(MarkNotificationAsReadService);
  markAllAsReadService = inject(MarkAllNotificationsAsReadService);
  userListService = inject(UserListService);
  activatedRoute = inject(ActivatedRoute);

  userId = this.activatedRoute.snapshot.params['idUser'];


  constructor(@Inject(ProjectLayoutComponent) private parent: ProjectLayoutComponent) {

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
  }


  public getNotifications() {
    this.notificationsListService.invoke(this.userId).subscribe((response: NotificationsListed[]) => {
      this.notifications = response;
    })
  }

  public markAsRead(id: string) {
    this.markAsReadService.invoke(id).subscribe({
      next: (result) => {
        this.getNotifications();
        window.location.reload();
      }, error: (errorResponse) => {
        console.log(errorResponse);
      }
    })
  }

  public markAllAsRead(id: string) {
    this.markAllAsReadService.invoke(id).subscribe({
      next: (result) => {
        this.getNotifications();

      }, error: (errorResponse) => {
        console.log(errorResponse);
      }
    })
  }

}
