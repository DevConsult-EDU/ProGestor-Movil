import {Component, Inject, OnInit} from '@angular/core';
import {ProjectLayoutComponent} from "../../../../project-layout/project-layout.component";

@Component({
  selector: 'app-notifications-list',
  standalone: false,
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss'],
})
export class NotificationsListComponent  implements OnInit {

  constructor(@Inject(ProjectLayoutComponent) private parent: ProjectLayoutComponent) {

  }

  ngOnInit() {
    this.parent.titulo = 'Notificaciones';
  }

}
