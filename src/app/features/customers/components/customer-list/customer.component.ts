import {Component, inject, OnInit} from '@angular/core';
import {CustomerListService} from "../../services/customer-list-service/customer-list.service";
import {CustomerListed} from "../../../../shared/interfaces/customerListed.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: '../../pages/customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent  implements OnInit {

  customerListService = inject(CustomerListService);
  public customers = [] as CustomerListed[];
  router = inject(Router)

  ngOnInit() {

    this.customerListService.invoke().subscribe((response: CustomerListed[]) => {
      this.customers = response;
    })

  }

  navigateCreateCustomer() {
    this.router.navigate(['auth/customers/createCustomer']);
  }

  navigateDetailsCustomer(id: string) {
    this.router.navigate(['auth/customers', id]);
  }

}
