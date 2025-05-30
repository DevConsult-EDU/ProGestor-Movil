import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Observable} from "rxjs";

export interface register {
  name: string | undefined,
  email: string | undefined,
  password: string | undefined,

}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public http = inject(HttpClient)
  public apiUrl = environment.baseUrl;

  register(data: register): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data)
  }

}
