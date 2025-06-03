import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {UpdateProject} from "../../components/update-project/update-project.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateProjectService {

  public http = inject(HttpClient);
  public apiUrl = environment.baseUrl;

  updateProject(data: UpdateProject, id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/projects/updateProject/${id}`, data)
  }
}
