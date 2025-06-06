import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateComment} from "../../components/create-comment/create-comment.component";

@Injectable({
  providedIn: 'root'
})
export class CreateCommentService {

  public http = inject(HttpClient)
  public apiUrl = environment.baseUrl;


  createComment(data: CreateComment): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/comments/createComment`, data)
  }
}
