import {Component, Inject, inject, OnInit} from '@angular/core';
import {UserListService} from "../../services/user-list-service/user-list.service";
import {UserListed} from "../../../../shared/interfaces/userListed.interface";
import {Router} from "@angular/router";
import {ProjectLayoutComponent} from "../../../../project-layout/project-layout.component";

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
})
export class UsersComponent  implements OnInit {

  userListService = inject(UserListService);
  public users = [] as UserListed[];
  router = inject(Router)

  constructor(@Inject(ProjectLayoutComponent) private parent: ProjectLayoutComponent) {
  }

  ngOnInit() {
    this.parent.titulo = 'Usuarios';
    this.userListService.invoke().subscribe((response: UserListed[]) => {
      this.users = response;
    })

  }

  navigateDetailsUser(id: string) {
    this.router.navigate(['users', id]);
  }

  navigateCreateUser() {
    this.router.navigate(['users/createUser']);
  }

}
