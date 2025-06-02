import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeleteTaskService {

  public http = inject(HttpClient)
  public apiUrl = environment.baseUrl

  deleteTask(id: string){
    return this.http.delete<Task>(`${this.apiUrl}/auth/tasks/${id}`);
  }
}
