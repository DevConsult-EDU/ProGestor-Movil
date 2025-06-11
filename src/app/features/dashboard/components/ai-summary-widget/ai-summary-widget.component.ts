import { Component, OnInit } from '@angular/core';
import {AiSummaryService} from "../../services/ai-summary-service/ai-summary.service";

@Component({
  selector: 'app-ai-summary-widget',
  standalone: false,
  templateUrl: './ai-summary-widget.component.html',
  styleUrls: ['./ai-summary-widget.component.scss'],
})
export class AiSummaryWidgetComponent  implements OnInit {

  public summary!: string;

  constructor(private aiSummaryWidgetService: AiSummaryService) { }

  ngOnInit() {
    this.getSummary();
  }

  getSummary() {
    this.aiSummaryWidgetService.invoke().subscribe({
      next: data => {
        this.summary = data.summary;
      }
    })
  }

}
