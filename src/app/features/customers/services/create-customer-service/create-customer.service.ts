import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {CreateCustomer} from "../../components/create-customer/create-customer.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateCustomerService {

  public http = inject(HttpClient)
  public apiUrl = environment.baseUrl;


  createCustomer(data: CreateCustomer): Observable<any> {
    return this.http.post(`${this.apiUrl}/customers/createCustomer`, data)
  }
}
