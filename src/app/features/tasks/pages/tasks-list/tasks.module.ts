import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TasksComponent} from "./tasks.component";
import {IonicModule} from "@ionic/angular";
import { RouterModule } from '@angular/router';
import {AiChatSuggestionsModule} from "../../components/ai-chat-suggestions/ai-chat-suggestions.module";



@NgModule({
  declarations: [TasksComponent],
    imports: [
        CommonModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: TasksComponent
            },
        ]),
        AiChatSuggestionsModule
    ]
})
export class TasksModule { }
