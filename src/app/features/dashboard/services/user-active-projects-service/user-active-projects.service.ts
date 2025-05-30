import {inject, Injectable} from '@angular/core';
import {ProjectListed} from "../../../../shared/interfaces/projectListed.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserActiveProjectsService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(): Observable<ProjectListed[]> {
    return this.http.get<ProjectListed[]>(`${this.apiUrl}/dashboard/projects`);
  }

}
