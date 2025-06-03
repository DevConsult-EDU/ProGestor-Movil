import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment.prod";
import {Observable} from "rxjs";
import {TimeEntriesListed} from "../../../../../shared/interfaces/time-entries-listed";

@Injectable({
  providedIn: 'root'
})
export class TimeEntriesListService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(taskId: string): Observable<TimeEntriesListed[]> {
    return this.http.get<TimeEntriesListed[]>(`${this.apiUrl}/tasks/${taskId}/time-entries`);
  }
}
