import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Observable} from "rxjs";
import {UserListed} from "../../../../shared/interfaces/userListed.interface";

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(): Observable<UserListed[]> {
    return this.http.get<UserListed[]>(`${this.apiUrl}/users`);
  }
}
