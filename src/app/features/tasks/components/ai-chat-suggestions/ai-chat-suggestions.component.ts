import { Component, OnInit } from '@angular/core';
import {AiChatSuggestionsService} from "../../services/ai-chat-suggestions-service/ai-chat-suggestions.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-ai-chat-suggestions',
  standalone: false,
  templateUrl: './ai-chat-suggestions.component.html',
  styleUrls: ['./ai-chat-suggestions.component.scss'],
})
export class AiChatSuggestionsComponent  implements OnInit {

  public suggestion!: string;
  public isLoading = false;

  constructor(private aiChatSuggestions: AiChatSuggestionsService) { }

  ngOnInit() {
    this.getSuggestions();
  }

  getSuggestions() {

    this.isLoading = true;

    this.aiChatSuggestions.invoke().pipe(finalize(() => this.isLoading = false)).subscribe({
      next: data => {

        this.suggestion = data.summary;
        console.log(this.suggestion);
      }, error: err => {

        this.suggestion = "Error al cargar la sugerencia. Por favor, inténtalo de nuevo.";
        console.error("Error al obtener sugerencias:", err);
      }
    })
  }

}
