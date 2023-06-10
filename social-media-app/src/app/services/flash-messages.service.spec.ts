import { TestBed } from '@angular/core/testing';

import { FlashMessagesService } from './flash-messages.service';

describe('FlashMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlashMessagesService = TestBed.get(FlashMessagesService);
    expect(service).toBeTruthy();
  });
});
