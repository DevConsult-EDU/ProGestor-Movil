import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AiSummaryWidgetComponent} from "./ai-summary-widget.component";
import {IonicModule} from "@ionic/angular";
import {MarkdownModule} from "ngx-markdown";



@NgModule({
  declarations: [AiSummaryWidgetComponent],
  exports: [
    AiSummaryWidgetComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MarkdownModule.forRoot({

    })
  ]
})
export class AiSummaryWidgetModule { }
