import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {UpdateUser} from "../../components/update-user/update-user.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  public http = inject(HttpClient);
  public apiUrl = environment.baseUrl;

  updateUser(data: UpdateUser, id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/updateUser/${id}`, data)
  }

}
