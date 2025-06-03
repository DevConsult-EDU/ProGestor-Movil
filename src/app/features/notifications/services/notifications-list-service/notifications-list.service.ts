import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {NotificationsListed} from "../../../../shared/interfaces/notifications-listed";

@Injectable({
  providedIn: 'root'
})
export class NotificationsListService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(userId: string): Observable<NotificationsListed[]> {
    return this.http.get<NotificationsListed[]>(`${this.apiUrl}/auth/notifications/${userId}`);
  }
}
