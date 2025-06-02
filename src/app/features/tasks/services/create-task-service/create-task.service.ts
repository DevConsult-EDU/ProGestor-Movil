import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {CreateTask} from "../../components/create-task/create-task.component";

@Injectable({
  providedIn: 'root'
})
export class CreateTaskService {

  public http = inject(HttpClient)
  public apiUrl = environment.baseUrl;


  createProject(data: CreateTask): Observable<any> {
    return this.http.post(`${this.apiUrl}/tasks/createTask`, data)
  }
}
