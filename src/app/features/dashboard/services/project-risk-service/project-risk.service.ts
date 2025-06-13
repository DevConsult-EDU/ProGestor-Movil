import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Observable} from "rxjs";

export interface ProjectRisk {
  riskSummary: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectRiskService {

  http = inject(HttpClient);

  apiUrl = environment.baseUrl;

  invoke(): Observable<ProjectRisk> {
    return this.http.get<ProjectRisk>(`${this.apiUrl}/dashboard/ai-risk-analysis`)
  }
}
