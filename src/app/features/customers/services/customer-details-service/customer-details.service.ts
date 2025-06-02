import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {catchError, map, Observable} from "rxjs";
import {Customer} from "../../../../shared/interfaces/customer.interface";

@Injectable({
  providedIn: 'root'
})
export class CustomerDetailsService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(customerId: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.apiUrl}/customers/${customerId}`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error('Error fetching user details:', error);
          throw error;
        })
      );
  }
}
