import {Component} from '@angular/core';
import {register, RegisterService} from "../../../../core/auth/services/register-service/register.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent {

  protected registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private registerService: RegisterService,
              private toastController: ToastController,
              private router: Router,) {
    this.buildForm();
  }

  public buildForm() {
    this.registerForm = this.formBuilder.group<register>({
      name: undefined,
      email: undefined,
      password: undefined,
    });
  }

  async successfullyRegistered() {
    const toast = await this.toastController.create({
      message: 'You have been registered successfully',
      position: 'bottom',
      duration: 3000,
      color: 'success',
    });

    await toast.present();
  }

  async errorfullyRegistered() {
    const toast = await this.toastController.create({
      message: 'An error has occurred, while trying to register',
      position: 'bottom',
      duration: 3000,
      color: 'danger',
    });

    await toast.present();
  }

  public register($event: any) {
    $event.preventDefault();
    this.registerService.register(this.registerForm.value).subscribe({
      next: async (result) => {
        await this.successfullyRegistered();
        await this.router.navigateByUrl('/dashboard');
      }, error: async (errorResponse) => {
        console.log(errorResponse);
        await this.errorfullyRegistered();
      }
    });
  }

}
