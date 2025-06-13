import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TasksAiAnalysisComponent} from "./tasks-ai-analysis.component";
import {IonicModule} from "@ionic/angular";
import {MarkdownComponent} from "ngx-markdown";



@NgModule({
  declarations: [TasksAiAnalysisComponent],
  exports: [
    TasksAiAnalysisComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MarkdownComponent
  ]
})
export class TasksAiAnalysisModule { }
