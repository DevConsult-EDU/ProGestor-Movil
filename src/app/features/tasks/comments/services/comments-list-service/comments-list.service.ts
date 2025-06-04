import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment.prod";
import {Observable} from "rxjs";
import {CommentsListed} from "../../../../../shared/interfaces/comments-listed";

@Injectable({
  providedIn: 'root'
})
export class CommentsListService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(taskId: string): Observable<CommentsListed[]> {
    return this.http.get<CommentsListed[]>(`${this.apiUrl}/tasks/${taskId}/comments`);
  }
}
