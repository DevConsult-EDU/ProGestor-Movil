import {Component, Inject, inject, OnInit} from '@angular/core';
import {CustomerListService} from "../../services/customer-list-service/customer-list.service";
import {CustomerListed} from "../../../../shared/interfaces/customerListed.interface";
import {Router} from "@angular/router";
import {ProjectLayoutComponent} from "../../../../project-layout/project-layout.component";

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent  implements OnInit {

  customerListService = inject(CustomerListService);
  public customers = [] as CustomerListed[];
  router = inject(Router)

  constructor(@Inject(ProjectLayoutComponent) private parent: ProjectLayoutComponent) {
  }

  ngOnInit() {

    this.parent.titulo = 'Clientes';
    this.customerListService.invoke().subscribe((response: CustomerListed[]) => {
      this.customers = response;
    })

  }

  navigateCreateCustomer() {
    this.router.navigate(['customers/createCustomer']);
  }

  navigateDetailsCustomer(id: string) {
    this.router.navigate(['customers', id]);
  }

}
