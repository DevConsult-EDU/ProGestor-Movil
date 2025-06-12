import { TestBed } from '@angular/core/testing';

import { AiChatSuggestionsService } from './ai-chat-suggestions.service';

describe('AiChatSuggestionsService', () => {
  let service: AiChatSuggestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiChatSuggestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
