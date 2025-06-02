import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {catchError, map, Observable} from "rxjs";
import {Project} from "../../../../shared/interfaces/project.interface";

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(projectId: string): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/projects/${projectId}`)
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
