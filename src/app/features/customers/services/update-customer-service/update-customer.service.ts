import {inject, Injectable} from '@angular/core';
import {UpdateCustomer} from "../../components/update-customer/update-customer.component";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class UpdateCustomerService {

  public http = inject(HttpClient);
  public apiUrl = environment.baseUrl;

  updateCustomer(data: UpdateCustomer, id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/customers/updateCustomer/${id}`, data)
  }
}
