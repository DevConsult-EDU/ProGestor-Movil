import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateAttachmentService {

  public http = inject(HttpClient)
  public apiUrl = environment.baseUrl;


  uploadAttachment(taskId: string | undefined, data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/attachments/${taskId}/createAttachment`, data)
  }
}
