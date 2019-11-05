import { TestBed } from '@angular/core/testing';

import { CurrentPointsService } from './current-points.service';

describe('CurrentPointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentPointsService = TestBed.get(CurrentPointsService);
    expect(service).toBeTruthy();
  });
});
