import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  aiTaskAnalysis,
  TasksAiAnalysisService
} from "../../services/tasks-ai-analysis-service/tasks-ai-analysis.service";
import {Chart} from "chart.js/auto";

@Component({
  selector: 'app-tasks-ai-analysis',
  standalone: false,
  templateUrl: './tasks-ai-analysis.component.html',
  styleUrls: ['./tasks-ai-analysis.component.scss'],
})
export class TasksAiAnalysisComponent implements OnInit, OnDestroy {

  public insight: string = '';
  public focusRecommendation: string = '';
  public isLoading: boolean = false;
  public error: string | null = null;
  protected chart: Chart | undefined = undefined;

  @ViewChild('analysisChartCanvas') private chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private tasksAnalysisService: TasksAiAnalysisService,
  ) {
  }

  ngOnInit(): void {
    this.loadAnalysisData();
  }

  ngOnDestroy(): void {

    this.chart?.destroy();
  }

  private loadAnalysisData(): void {
    this.isLoading = true;
    this.error = null;

    this.tasksAnalysisService.invoke().subscribe({
      next: (response) => {
        this.insight = response.insight;
        this.isLoading = false;
        this.focusRecommendation = response.focus_recommendation;
        this.createChart(response.chart_data);
      },
      error: (err) => {
        console.error('Error al obtener datos del análisis:', err);
        this.error = 'No se pudo cargar el análisis. Por favor, inténtalo de nuevo más tarde.';
        this.isLoading = false;
      }
    });
  }

  private createChart(chartData: aiTaskAnalysis['chart_data']): void {
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: chartData.labels,
        datasets: [{
          label: 'Distribución de Tareas',
          data: chartData.data,
          backgroundColor: chartData.colors,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += `${context.raw} tareas`;
                }
                return label;
              }
            }
          }
        }
      }
    });
  }

}
