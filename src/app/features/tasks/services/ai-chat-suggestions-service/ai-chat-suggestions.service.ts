import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Observable} from "rxjs";
import {Summary} from "../../../../shared/interfaces/summary";

@Injectable({
  providedIn: 'root'
})
export class AiChatSuggestionsService {

  http = inject(HttpClient);

  apiUrl = environment.baseUrl;

  invoke(): Observable<Summary> {
    return this.http.get<Summary>(`${this.apiUrl}/tasks/ai-suggestions`);
  }
}
