import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../../shared/interfaces/user.interface";
import {UserDetailsService} from "../../services/user-details-service/user-details.service";
import {DeleteUserService} from "../../services/delete-user-service/delete-user.service";

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: '../../pages/user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent  implements OnInit {

  activatedRoute = inject(ActivatedRoute)

  public user: User = {} as User;

  userId = this.activatedRoute.snapshot.params['idUser'];

  userDetailsService = inject(UserDetailsService);
  deleteUserService = inject(DeleteUserService)

  router = inject(Router)


  ngOnInit() {
    this.userDetailsService.invoke(this.userId).subscribe({
      next: result => {
        this.user = result;
      }
    })
  }

  navigateUpdateUser() {
    this.router.navigate(['/users/updateUser/' + this.userId]);
  }

  executeDelete(){

    const confirmDelete = window.confirm('¿Estas seguro de que deseas eliminar este usuario?');

    if (confirmDelete) {
      this.deleteUserService.deleteUser(this.userId)
        .subscribe({
          next: () => {
            this.router.navigate(['/users']);
            window.location.reload();
          },
          error: (error) => {
            console.error('Error al eliminar usuario:', error);
          }
        });
    }


  }

}
