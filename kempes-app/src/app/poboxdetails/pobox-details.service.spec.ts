import { TestBed } from '@angular/core/testing';

import { POBoxDetailsService } from './pobox-details.service';

describe('POBoxDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: POBoxDetailsService = TestBed.get(POBoxDetailsService);
    expect(service).toBeTruthy();
  });
});
