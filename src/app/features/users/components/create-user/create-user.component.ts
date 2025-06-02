import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CreateUserService} from "../../services/create-user-service/create-user.service";
import {Router} from "@angular/router";

export interface CreateUser {
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
  rol: string | undefined;
}

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: '../../pages/create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {

  protected createUserForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private createUserService: CreateUserService,
              private router: Router,) {
    this.buildForm();
  }

  public buildForm(){
    this.createUserForm = this.formBuilder.group<CreateUser>({
      name: undefined,
      email: undefined,
      password: undefined,
      rol: undefined,
    });
  }

  public storeUser($event: any) {
    $event.preventDefault();
    this.createUserService.createUser(this.createUserForm.value).subscribe({
      next: (result) => {
        this.router.navigateByUrl('/users');
        window.alert('Usuario creado correctamente');
      }, error: (errorResponse) => {
        window.alert('Ha habido un error creando el Usuario. Intentelo de nuevo');
        console.log(errorResponse);
      }
    });

  }

}
