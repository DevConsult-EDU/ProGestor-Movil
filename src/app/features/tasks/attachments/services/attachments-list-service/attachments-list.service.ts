import {inject, Injectable} from '@angular/core';
import {AttachmentsListed} from "../../../../../shared/interfaces/attachments-listed";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment.prod";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AttachmentsListService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(taskId: string): Observable<AttachmentsListed[]> {
    return this.http.get<AttachmentsListed[]>(`${this.apiUrl}/tasks/${taskId}/attachments`);
  }
}
