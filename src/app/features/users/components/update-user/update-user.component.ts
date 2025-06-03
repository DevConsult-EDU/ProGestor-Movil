import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../../../shared/interfaces/user.interface";
import {UpdateUserService} from "../../services/update-user-service/update-user.service";
import {UserDetailsService} from "../../services/user-details-service/user-details.service";
import {ActivatedRoute, Router} from "@angular/router";

export interface UpdateUser {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  rol: string | undefined;
}

@Component({
  selector: 'app-update-user',
  standalone: false,
  templateUrl: '../../pages/update-user.component.html',
  styleUrls: ['./update-user.component.scss'],
})
export class UpdateUserComponent  implements OnInit {

  protected updateUserForm!: FormGroup;
  public user: User = {} as User;
  public userId: string;

  constructor(private formBuilder: FormBuilder,
              private updateUserService: UpdateUserService,
              private userDetailsService: UserDetailsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.buildForm();
    this.userId = this.activatedRoute.snapshot.params['idUser'];
  }

  public buildForm(){
    this.updateUserForm = this.formBuilder.group<UpdateUser>({
      name: undefined,
      email: undefined,
      password: undefined,
      rol: undefined,
    });
  }

  ngOnInit() {
    this.userDetailsService.invoke(this.userId).subscribe({
      next: result => {
        this.user = result;
        this.fillForm()
      }
    })
  }

  public editUser($event: any) {
    $event.preventDefault();
    this.updateUserService.updateUser(this.updateUserForm.value, this.userId).subscribe({
      next: (result) => {
        this.router.navigateByUrl('/users');

      }, error: (errorResponse) => {
        console.log(errorResponse);
      }
    });

  }

  private fillForm() {
    this.updateUserForm.patchValue({
      name: this.user.name,
      email: this.user.email,
      password: undefined,
      rol: this.user.rol,
    })
  }

}
