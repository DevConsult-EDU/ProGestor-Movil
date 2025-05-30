import {Component, inject, OnInit} from '@angular/core';
import {UserListService} from "../../services/user-list-service/user-list.service";
import {UserListed} from "../../../../shared/interfaces/userListed.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: '../../pages/users.component.html',
})
export class UsersComponent  implements OnInit {

  userListService = inject(UserListService);
  public users = [] as UserListed[];
  router = inject(Router)

  ngOnInit() {

    this.userListService.invoke().subscribe((response: UserListed[]) => {
      this.users = response;
    })

  }

  navigateDetailsUser(id: string) {
    this.router.navigate(['auth/users', id]);
  }

  navigateCreateUser() {
    this.router.navigate(['auth/users/createUser']);
  }

}
