import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {catchError, map, Observable} from "rxjs";
import {User} from "../../../../shared/interfaces/user.interface";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`)
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
