import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";
import {Task} from "../../../../shared/interfaces/task.interface";

@Injectable({
  providedIn: 'root'
})
export class TaskDetailsService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(taskId: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/tasks/${taskId}`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error('Error fetching project details:', error);
          throw error;
        })
      );
  }
}
