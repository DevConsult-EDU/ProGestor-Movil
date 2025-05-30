import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Observable} from "rxjs";
import {CustomerListed} from "../../../../shared/interfaces/customerListed.interface";

@Injectable({
  providedIn: 'root'
})
export class CustomerListService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(): Observable<CustomerListed[]> {
    return this.http.get<CustomerListed[]>(`${this.apiUrl}/customers`);
  }
}
