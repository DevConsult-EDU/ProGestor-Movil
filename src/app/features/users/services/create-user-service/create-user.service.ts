import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Observable} from "rxjs";
import {CreateUser} from "../../components/create-user/create-user.component";

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  public http = inject(HttpClient);
  public apiUrl = environment.baseUrl;

  createUser(data: CreateUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/createUser`, data)
  }
}
