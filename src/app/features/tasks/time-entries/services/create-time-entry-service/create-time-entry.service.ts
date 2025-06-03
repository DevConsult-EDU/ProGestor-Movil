import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment.prod";
import {CreateTimeEntry} from "../../components/create-time-entry/create-time-entry.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateTimeEntryService {

  public http = inject(HttpClient)
  public apiUrl = environment.baseUrl;


  createTimeEntry(data: CreateTimeEntry): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/time-entries/createTimeEntry`, data)
  }
}
