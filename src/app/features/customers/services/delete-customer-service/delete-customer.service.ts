import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Customer} from "../../../../shared/interfaces/customer.interface";

@Injectable({
  providedIn: 'root'
})
export class DeleteCustomerService {


  public http = inject(HttpClient)
  public apiUrl = environment.baseUrl

  deleteCustomer(id: string){
    return this.http.delete<Customer>(`${this.apiUrl}/auth/customers/${id}`);
  }
}
