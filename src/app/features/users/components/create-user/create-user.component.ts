import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CreateUserService } from "../../services/create-user-service/create-user.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastController } from '@ionic/angular';

export interface CreateUser {
  name: string | null;
  email: string | null;
  password: string | null;
  rol: string | null;
}

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent {

  protected createUserForm!: FormGroup;
  public isSubmitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private createUserService: CreateUserService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.buildForm();
  }

  public buildForm() {
    this.createUserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      rol: ['', [Validators.required]],
    });
  }

  get f() {
    return this.createUserForm.controls;
  }

  public storeUser(event: Event) { // Acepta el evento para preventDefault
    event.preventDefault();
    this.isSubmitted = true;
    this.clearServerValidationErrors(); // Limpiar errores de servidor previos

    if (this.createUserForm.invalid) {
      this.presentToast('Por favor, corrige los errores del formulario.', 'warning');
      console.log('Formulario inválido:', this.createUserForm.errors);
      // Marcar todos los campos como tocados para que se muestren los errores de Angular
      Object.values(this.createUserForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.createUserService.createUser(this.createUserForm.value).subscribe({
      next: async (result) => {
        await this.presentToast('Usuario creado correctamente', 'success');
        this.router.navigateByUrl('/users');
        this.createUserForm.reset();
        this.isSubmitted = false;
      },
      error: async (errorResponse: HttpErrorResponse) => {
        console.error('Error response:', errorResponse);
        if (errorResponse.status === 422 && errorResponse.error && errorResponse.error.errors) {
          // Errores de validación del backend
          const backendErrors = errorResponse.error.errors;
          Object.keys(backendErrors).forEach(field => {
            const control = this.createUserForm.get(field);
            if (control) {
              // Mantenemos los errores de Angular y añadimos el nuestro
              const currentErrors = control.errors || {};
              control.setErrors({ ...currentErrors, serverValidationError: true });
            }
          });
          await this.presentToast('Algunos campos tienen errores. Por favor, revísalos.', 'danger');
        } else {
          // Otros errores (red, servidor, etc.)
          const message = errorResponse.error?.message || 'Ha habido un error creando el Usuario. Intentelo de nuevo';
          await this.presentToast(message, 'danger');
        }
      }
    });
  }

  // Limpia solo el flag de 'serverValidationError' para todos los controles
  private clearServerValidationErrors(): void {
    Object.keys(this.createUserForm.controls).forEach(key => {
      this.clearSpecificServerValidationError(key);
    });
  }

  // Limpia el flag 'serverValidationError' de un control específico
  // Se llama cuando el usuario modifica el input/select
  public clearSpecificServerValidationError(controlName: string): void {
    const control = this.createUserForm.get(controlName);
    if (control && control.errors && control.errors['serverValidationError']) {
      const { serverValidationError, ...otherErrors } = control.errors; // Quita serverValidationError
      if (Object.keys(otherErrors).length > 0) {
        control.setErrors(otherErrors);
      } else {
        control.setErrors(null); // Si no hay otros errores, limpia todos
      }
    }
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}
