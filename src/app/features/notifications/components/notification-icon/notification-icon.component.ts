import {Component, inject, OnInit} from '@angular/core';
import {
  CountUnreadNotificationsService
} from "../../services/count-unread-notifications-service/count-unread-notifications.service";

@Component({
  selector: 'app-notification-icon',
  standalone: false,
  templateUrl: '../../pages/notification-icon.component.html',
  styleUrls: ['./notification-icon.component.scss'],
})
export class NotificationIconComponent  implements OnInit {

  countUnreadNotificationsService = inject(CountUnreadNotificationsService);
  public cont = 0;

  public getCountUnreadNotifications(){
    this.countUnreadNotificationsService.invoke().subscribe((response: number) => {
      this.cont = response;
    })
  }
  ngOnInit() {

    this.getCountUnreadNotifications();

  }

}
