import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AiChatSuggestionsComponent} from "./ai-chat-suggestions.component";
import {IonicModule} from "@ionic/angular";
import {MarkdownComponent, MarkdownModule} from "ngx-markdown";



@NgModule({
  declarations: [AiChatSuggestionsComponent],
  exports: [
    AiChatSuggestionsComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MarkdownModule.forRoot({

    })
  ]
})
export class AiChatSuggestionsModule { }
