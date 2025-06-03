import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountUnreadNotificationsService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/auth/notifications/count-unread`);
  }
}
