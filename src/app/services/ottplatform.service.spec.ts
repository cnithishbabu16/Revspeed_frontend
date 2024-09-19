import { TestBed } from '@angular/core/testing';

import { OttplatformService } from './ottplatform.service';

describe('OttplatformService', () => {
  let service: OttplatformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OttplatformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
