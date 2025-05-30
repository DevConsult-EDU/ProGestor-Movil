import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Observable} from "rxjs";
import {TaskListed} from "../../../../shared/interfaces/taskListed.interface";

@Injectable({
  providedIn: 'root'
})
export class UserPendingTasksService {

  public http = inject(HttpClient)

  public url = environment.baseUrl;

  invoke(): Observable<TaskListed[]> {
    return this.http.get<TaskListed[]>(`${this.url}/dashboard/tasks`);
  }
}
