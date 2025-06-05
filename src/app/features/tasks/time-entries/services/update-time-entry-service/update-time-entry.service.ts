import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment.prod";
import {UpdateTimeEntry} from "../../components/update-time-entry/update-time-entry.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UpdateTimeEntryService {

  public http = inject(HttpClient);
  public apiUrl = environment.baseUrl;

  updateTimeEntry(data: UpdateTimeEntry, id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/time-entries/${id}/updateTimeEntry`, data)
  }
}
