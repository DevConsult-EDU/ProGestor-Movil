import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MarkNotificationAsReadService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(notificationId: string): Observable<any> {

    return this.http.put(`${this.apiUrl}/auth/notifications/${notificationId}/mark-as-readed`, {})
      .pipe(tap((response) =>{
        return response;
      }));
  }
}
