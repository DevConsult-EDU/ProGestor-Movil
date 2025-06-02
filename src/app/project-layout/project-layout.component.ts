import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../core/auth/services/auth-service.service";

@Component({
  selector: 'app-project-layout',
  standalone: false,
  templateUrl: './project-layout.component.html',
  styleUrls: ['./project-layout.component.scss'],
})
export class ProjectLayoutComponent {
  public titulo: string = '';
  @ViewChild('menu') menu!: HTMLIonMenuElement;

  constructor(public router: Router,
              public authService: AuthService) {
  }

  async navigateRoute(ruta: string) {
    await this.menu.toggle(true);
    await this.router.navigate([ruta]);
  }

  logout() {
    this.authService.logout();
  }
}
