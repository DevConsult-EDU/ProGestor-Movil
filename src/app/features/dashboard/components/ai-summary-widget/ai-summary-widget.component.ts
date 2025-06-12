import { Component, OnInit } from '@angular/core';
import {AiSummaryService} from "../../services/ai-summary-service/ai-summary.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-ai-summary-widget',
  standalone: false,
  templateUrl: './ai-summary-widget.component.html',
  styleUrls: ['./ai-summary-widget.component.scss'],
})
export class AiSummaryWidgetComponent  implements OnInit {

  public summary!: string;
  public isLoading = false;

  constructor(private aiSummaryWidgetService: AiSummaryService) { }

  ngOnInit() {
    this.getSummary();
  }

  getSummary() {

    this.isLoading = true;

    this.aiSummaryWidgetService.invoke().pipe(finalize(() => this.isLoading = false)).subscribe({
      next: data => {
        this.summary = data.summary;
      }, error: err => {

        this.summary = "Error al cargar la sugerencia. Por favor, inténtalo de nuevo.";
        console.error("Error al obtener sugerencias:", err);
      }
    })
  }

}
