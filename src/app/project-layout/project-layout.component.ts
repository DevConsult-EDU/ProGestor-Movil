import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../core/auth/services/auth-service.service";
import {MenuServiceService} from "../shared/services/menu-service.service";
import {MenuItem} from "../shared/interfaces/menu-item";

@Component({
  selector: 'app-project-layout',
  standalone: false,
  templateUrl: './project-layout.component.html',
  styleUrls: ['./project-layout.component.scss'],
})
export class ProjectLayoutComponent {
  public titulo: string = '';
  public menuItems: MenuItem[];
  @ViewChild('menu') menu!: HTMLIonMenuElement;

  constructor(public router: Router,
              public authService: AuthService,
              public menuService: MenuServiceService) {

    this.menuItems = this.menuService.getMenuByRol();
  }

  async navigateRoute(ruta: string) {
    await this.menu.toggle(true);
    await this.router.navigate([ruta]);
  }

  logout() {
    this.authService.logout();
  }
}
