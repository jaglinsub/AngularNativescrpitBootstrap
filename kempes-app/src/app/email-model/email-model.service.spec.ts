import { TestBed } from '@angular/core/testing';

import { EmailModelService } from './email-model.service';

describe('EmailModelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmailModelService = TestBed.get(EmailModelService);
    expect(service).toBeTruthy();
  });
});
