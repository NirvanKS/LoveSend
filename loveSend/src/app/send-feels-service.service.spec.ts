import { TestBed } from '@angular/core/testing';

import { SendFeelsServiceService } from './send-feels-service.service';

describe('SendFeelsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendFeelsServiceService = TestBed.get(SendFeelsServiceService);
    expect(service).toBeTruthy();
  });
});
