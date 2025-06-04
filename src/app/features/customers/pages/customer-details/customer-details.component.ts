import { Component, inject, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../../../../shared/interfaces/customer.interface";
import {CustomerDetailsService} from "../../services/customer-details-service/customer-details.service";
import {DeleteCustomerService} from "../../services/delete-customer-service/delete-customer.service";

@Component({
  selector: 'app-customer-details',
  standalone: false,
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent  implements OnInit {

  activatedRoute = inject(ActivatedRoute)

  public customer: Customer = {} as Customer;

  customerId = this.activatedRoute.snapshot.params['idCustomer'];

  customerDetailsService = inject(CustomerDetailsService);
  deleteCustomerService = inject(DeleteCustomerService)

  router = inject(Router)


  ngOnInit() {
    this.customerDetailsService.invoke(this.customerId).subscribe({
      next: result => {
        this.customer = result;
      }
    })
  }

  navigateUpdateCustomer() {
    this.router.navigate(['/customers/updateCustomer/' + this.customerId]);
  }

  executeDeleteCustomer(){
    const confirmDelete = window.confirm('¿Estas seguro de que deseas eliminar este cliente?');

    if (confirmDelete) {
      this.deleteCustomerService.deleteCustomer(this.customerId)
        .subscribe({
          next: () => {
            this.router.navigate(['/customers']);
            window.location.reload();
          },
          error: (error) => {
            console.error('Error al eliminar cliente:', error);
          }
        });
    }


  }

}
