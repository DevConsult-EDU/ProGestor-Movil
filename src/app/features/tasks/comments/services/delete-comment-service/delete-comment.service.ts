import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class DeleteCommentService {

  public http = inject(HttpClient)
  public apiUrl = environment.baseUrl

  deleteComment(id: string){
    return this.http.delete<Comment>(`${this.apiUrl}/auth/comments/${id}`);
  }
}
