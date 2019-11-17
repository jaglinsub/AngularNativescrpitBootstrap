import { TestBed } from '@angular/core/testing';

import { PoboxService } from './pobox.service';

describe('PoboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoboxService = TestBed.get(PoboxService);
    expect(service).toBeTruthy();
  });
});
