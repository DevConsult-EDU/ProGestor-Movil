import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CreateCustomerService} from "../../services/create-customer-service/create-customer.service";
import {Router} from "@angular/router";

export interface CreateCustomer {
  name: string | undefined;
  email: string | undefined;
  phone: number | undefined;
  address: string | undefined;
}

@Component({
  selector: 'app-create-customer',
  standalone: false,
  templateUrl: '../../pages/create-customer.component.html',
  styleUrls: ['./create-customer.component.scss'],
})
export class CreateCustomerComponent {

  protected createCustomerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private createCustomerService: CreateCustomerService,
              private router: Router,) {
    this.buildForm();
  }

  public buildForm(){
    this.createCustomerForm = this.formBuilder.group<CreateCustomer>({
      name: undefined,
      email: undefined,
      phone: undefined,
      address: undefined,
    });
  }

  public storeCustomer($event: any) {
    $event.preventDefault();
    this.createCustomerService.createCustomer(this.createCustomerForm.value).subscribe({
      next: (result) => {
        this.router.navigateByUrl('/customers');
        window.alert('Cliente creado correctamente');
        window.location.reload();
      }, error: (errorResponse) => {
        window.alert('Ha habido un error creando el cliente. Intentelo de nuevo');
        console.log(errorResponse);
      }
    });

  }

}
