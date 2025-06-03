import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {UpdateTask} from "../../components/update-task/update-task.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateTaskService {


  public http = inject(HttpClient);
  public apiUrl = environment.baseUrl;

  updateTask(data: UpdateTask, id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/tasks/updateTask/${id}`, data)
  }
}
