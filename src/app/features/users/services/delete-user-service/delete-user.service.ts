import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {User} from "../../../../shared/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  public http = inject(HttpClient)
  public apiUrl = environment.baseUrl

  deleteUser(id: string){
    return this.http.delete<User>(`${this.apiUrl}/auth/users/${id}`);
  }
}
