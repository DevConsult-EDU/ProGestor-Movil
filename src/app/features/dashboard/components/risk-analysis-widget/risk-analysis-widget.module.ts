import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RiskAnalysisWidgetComponent} from "./risk-analysis-widget.component";
import {IonicModule} from "@ionic/angular";
import {MarkdownComponent} from "ngx-markdown";



@NgModule({
  declarations: [RiskAnalysisWidgetComponent],
  exports: [
    RiskAnalysisWidgetComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MarkdownComponent
  ]
})
export class RiskAnalysisWidgetModule { }
