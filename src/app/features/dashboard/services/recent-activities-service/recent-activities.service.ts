import {inject, Injectable} from '@angular/core';
import {CommentsListed} from "../../../../shared/interfaces/comments-listed";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecentActivitiesService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(): Observable<CommentsListed[]> {
    return this.http.get<CommentsListed[]>(`${this.apiUrl}/dashboard/comments`);
  }
}
