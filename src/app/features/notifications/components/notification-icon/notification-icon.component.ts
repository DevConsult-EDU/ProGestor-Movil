import {Component, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-notification-icon',
  standalone: true,
  templateUrl: './notification-icon.component.html',
  styleUrls: ['./notification-icon.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink
  ]
})
export class NotificationIconComponent  {

  @Input() isMenuItem: boolean = true;
  @Input() cont: number = 0;
}
