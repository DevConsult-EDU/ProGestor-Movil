import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Observable} from "rxjs";

export interface descriptionAI {
  descriptionAI: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class DescriptionEnhancerService {

  http = inject(HttpClient);

  apiUrl = environment.baseUrl;

  invoke(name: string, type: string): Observable<descriptionAI> {
      return this.http.get<descriptionAI>(`${this.apiUrl}/projects/ai-assistance`, {params: {name, type}});
  }
}
