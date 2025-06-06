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

  invoke(userId: string, page: number, limit: number, filters: string[]): Observable<NotificationsListed[]> {

    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filters && filters.length > 0) {
      filters.forEach(filter => {

        params = params.append('types[]', filter);
      });
    }

    return this.http.get<NotificationsListed[]>(`${this.apiUrl}/auth/notifications/${userId}`, { params });
  }
}
