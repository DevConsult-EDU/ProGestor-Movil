import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Project} from "../../../../shared/interfaces/project.interface";

@Injectable({
  providedIn: 'root'
})
export class DeleteProjectService {

  public http = inject(HttpClient)
  public apiUrl = environment.baseUrl

  deleteProject(id: string){
    return this.http.delete<Project>(`${this.apiUrl}/auth/projects/${id}`);
  }
}
