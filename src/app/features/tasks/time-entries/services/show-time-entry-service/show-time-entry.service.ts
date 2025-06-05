import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../../environments/environment.prod";
import {catchError, map, Observable} from "rxjs";
import {TimeEntry} from "../../../../../shared/interfaces/time-entry";

@Injectable({
  providedIn: 'root'
})
export class ShowTimeEntryService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(timeEntryId: string): Observable<TimeEntry> {
    return this.http.get<TimeEntry>(`${this.apiUrl}/auth/time-entries/${timeEntryId}`)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(error => {
          console.error('Error fetching time entry details:', error);
          throw error;
        })
      );
  }
}
