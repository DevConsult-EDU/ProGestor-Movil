import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../core/auth/services/auth-service.service";
import {MenuServiceService} from "../shared/services/menu-service.service";
import {MenuItem} from "../shared/interfaces/menu-item";
import {
  NotificationIconComponent
} from "../features/notifications/components/notification-icon/notification-icon.component";
import {
  CountUnreadNotificationsService
} from "../features/notifications/services/count-unread-notifications-service/count-unread-notifications.service";
import {Observable, Subscription, timer} from "rxjs";
import {
  NotificationsListComponent
} from "../features/notifications/components/notifications-list/notifications-list.component";

@Component({
  selector: 'app-project-layout',
  standalone: false,
  templateUrl: './project-layout.component.html',
  styleUrls: ['./project-layout.component.scss'],
})
export class ProjectLayoutComponent implements OnInit {
  public titulo: string = '';
  public menuItems!: MenuItem[];
  public cont: number = 0;
  public timer!: Observable<number>;

  @ViewChild('menu') menu!: HTMLIonMenuElement;
  @ViewChild(NotificationsListComponent) notificationsList!: NotificationsListComponent;

  public notificationSubscription!: Subscription;
  constructor(public router: Router,
              public authService: AuthService,
              public menuService: MenuServiceService,
              public countUnreadNotifications: CountUnreadNotificationsService) {

  }

  ngOnInit(): void {
    this.timer = timer(0, 3000);

    this.notificationSubscription = this.timer.subscribe((response: number) => {
      this.getCountUnreadNotifications();
    })

    }

    public navigateToNotifications() {
      this.router.navigate(['/notifications']);
      if (this.cont > 0){
        this.notificationsList.getNotifications()
      }
    }

  public getCountUnreadNotifications(){
    this.countUnreadNotifications.invoke().subscribe((response: number) => {
      this.cont = response;
    })
  }

  async navigateRoute(ruta: string) {
    await this.menu.toggle(true);
    await this.router.navigate([ruta]);
  }

  logout() {
    this.authService.logout();
  }

  public ionViewWillEnter() {
    this.menuItems = [];
    this.menuItems = this.menuService.getMenuByRol();
  }
}
