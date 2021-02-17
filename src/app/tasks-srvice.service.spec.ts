import { TestBed } from '@angular/core/testing';

import { TasksSrviceService } from './tasks-srvice.service';

describe('TasksSrviceService', () => {
  let service: TasksSrviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksSrviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
