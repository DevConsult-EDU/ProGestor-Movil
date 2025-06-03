import {inject, Injectable} from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class MarkAllNotificationsAsReadService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(userId: string): Observable<any> {

    return this.http.put(`${this.apiUrl}/auth/notifications/${userId}/mark-all-readed`, {})
      .pipe(tap((response) =>{
        return response;
      }));
  }
}
