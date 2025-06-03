import {Injectable} from '@angular/core';
import {MenuItem} from "../interfaces/menu-item";

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  public rol: string|null;

  private sharedMenu: MenuItem[] = [
    {
      url: '/dashboard',
      icon: 'home-outline',
      name: 'Dashboard',
    },
    {
      url: '/projects',
      icon: 'briefcase-outline',
      name: 'Proyectos',
    },
    {
      url: '/tasks',
      icon: 'list-outline',
      name: 'Tareas',
    },
    {
      url: '/notifications',
      icon: 'notifications-outline',
      name: 'Notificaciones',
    },
  ];

  private adminMenu: MenuItem[] = [
    {
      url: '/users',
      icon: 'people-outline',
      name: 'Usuarios',
    },
    {
      url: '/customers',
      icon: 'person-circle-outline',
      name: 'Clientes',
    },
  ]

  constructor() {
    this.rol = localStorage.getItem("rol");
  }

  public getMenuByRol(): MenuItem[] {
    if (this.rol !== 'admin') {
      return this.sharedMenu;
    }

    return [...this.sharedMenu, ...this.adminMenu];
  }
}
