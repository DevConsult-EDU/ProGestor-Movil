import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../../environments/environment.prod";
import {Observable} from "rxjs";

export interface aiTaskAnalysis {
  chart_data: {
    labels: string[];
    data: number[];
    colors: string[];
  };
  insight: string;
  focus_recommendation: string;
}

@Injectable({
  providedIn: 'root'
})
export class TasksAiAnalysisService {

  public http = inject(HttpClient)

  public apiUrl = environment.baseUrl;

  invoke(): Observable<aiTaskAnalysis> {
    return this.http.get<aiTaskAnalysis>(`${this.apiUrl}/dashboard/ai-graphic`);
  }
}
