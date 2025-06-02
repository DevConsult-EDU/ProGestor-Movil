import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {CreateProject} from "../../components/create-project/create-project.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateProjectService {

  public http = inject(HttpClient)
  public apiUrl = environment.baseUrl;


  createProject(data: CreateProject): Observable<any> {
    return this.http.post(`${this.apiUrl}/projects/createProject`, data)
  }
}
