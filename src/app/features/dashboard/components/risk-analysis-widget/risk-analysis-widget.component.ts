import { Component, OnInit } from '@angular/core';
import {ProjectRiskService} from "../../services/project-risk-service/project-risk.service";

@Component({
  selector: 'app-risk-analysis-widget',
  standalone: false,
  templateUrl: './risk-analysis-widget.component.html',
  styleUrls: ['./risk-analysis-widget.component.scss'],
})
export class RiskAnalysisWidgetComponent  implements OnInit {

  public isLoading = false;
  public riskAnalysis!: string;

  constructor(private projectRiskService: ProjectRiskService) { }

  ngOnInit() {
    this.getRiskAnalysis();
  }

  getRiskAnalysis() {

    this.isLoading = true;

    this.projectRiskService.invoke().subscribe({
      next: data => {
        this.riskAnalysis = data.riskSummary;
        console.log(this.riskAnalysis)
        this.isLoading = false;
      }, error: err => {

        this.riskAnalysis = "Error al cargar los datos. Por favor, inténtalo de nuevo.";
        this.isLoading = false;
        console.error("Error al obtener sugerencias:", err);
      }
    })

  }

}
