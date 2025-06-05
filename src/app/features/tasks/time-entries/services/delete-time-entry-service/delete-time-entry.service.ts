import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment.prod";
import {TimeEntry} from "../../../../../shared/interfaces/time-entry";

@Injectable({
  providedIn: 'root'
})
export class DeleteTimeEntryService {


  public http = inject(HttpClient)
  public apiUrl = environment.baseUrl

  deleteTimeEntry(id: string){
    return this.http.delete<TimeEntry>(`${this.apiUrl}/auth/time-entries/${id}`);
  }
}
