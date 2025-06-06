import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment.prod";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {NotificationsListed} from "../../../../shared/interfaces/notifications-listed";

@Injectable({
  providedIn: 'root'
})
export class NotificationsListService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(userId: string, page: number, limit: number): Observable<NotificationsListed[]> {

    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get<NotificationsListed[]>(`${this.apiUrl}/auth/notifications/${userId}`, { params });
  }
}
