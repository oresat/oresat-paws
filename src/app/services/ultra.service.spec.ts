import { TestBed } from '@angular/core/testing';

import { UltraService } from './ultra.service';

describe('UltraService', () => {
  let service: UltraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UltraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
