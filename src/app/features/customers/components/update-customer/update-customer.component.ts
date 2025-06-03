import { Component, OnInit } from '@angular/core';
import {UpdateCustomerService} from "../../services/update-customer-service/update-customer.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Customer} from "../../../../shared/interfaces/customer.interface";
import {CustomerDetailsService} from "../../services/customer-details-service/customer-details.service";
import {ActivatedRoute, Router} from "@angular/router";

export interface UpdateCustomer {
  name: string | undefined;
  email: string | undefined;
  phone: number | undefined;
  address: string | undefined;
}

@Component({
  selector: 'app-update-customer',
  standalone: false,
  templateUrl: '../../pages/update-customer.component.html',
  styleUrls: ['./update-customer.component.scss'],
})
export class UpdateCustomerComponent  implements OnInit {

  protected updateCustomerForm!: FormGroup;
  public customer: Customer = {} as Customer;
  public customerId: string;

  constructor(private formBuilder: FormBuilder,
              private updateCustomerService: UpdateCustomerService,
              private customerDetailsService: CustomerDetailsService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.buildForm();
    this.customerId = this.activatedRoute.snapshot.params['idCustomer'];
  }

  public buildForm(){
    this.updateCustomerForm = this.formBuilder.group<UpdateCustomer>({
      name: undefined,
      email: undefined,
      phone: undefined,
      address: undefined,
    });
  }

  ngOnInit() {
    this.customerDetailsService.invoke(this.customerId).subscribe({
      next: result => {
        this.customer = result;
        this.fillForm()
      }
    })
  }

  public editCustomer($event: any) {
    $event.preventDefault();
    this.updateCustomerService.updateCustomer(this.updateCustomerForm.value, this.customerId).subscribe({
      next: (result) => {
        this.router.navigateByUrl('/customers');
      }, error: (errorResponse) => {
        console.log(errorResponse);
      }
    });
  }

  private fillForm() {
    this.updateCustomerForm.patchValue({
      name: this.customer.name,
      email: this.customer.email,
      phone: this.customer.phone,
      address: this.customer.address,
    })
  }

}
