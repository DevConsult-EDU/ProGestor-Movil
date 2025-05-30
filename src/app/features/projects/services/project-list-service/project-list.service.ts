import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Observable} from "rxjs";
import {ProjectListed} from "../../../../shared/interfaces/projectListed.interface";

@Injectable({
  providedIn: 'root'
})
export class ProjectListService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(): Observable<ProjectListed[]> {
    return this.http.get<ProjectListed[]>(`${this.apiUrl}/projects`);
  }
}
