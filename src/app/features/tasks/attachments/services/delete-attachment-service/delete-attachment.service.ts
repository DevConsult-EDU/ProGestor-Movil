import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Attachment} from "../../../../../shared/interfaces/attachment";

@Injectable({
  providedIn: 'root'
})
export class DeleteAttachmentService {

  public http = inject(HttpClient)
  public apiUrl = environment.baseUrl

  deleteAttachment(id: string){
    return this.http.delete<Attachment>(`${this.apiUrl}/auth/attachments/${id}`);
  }
}
