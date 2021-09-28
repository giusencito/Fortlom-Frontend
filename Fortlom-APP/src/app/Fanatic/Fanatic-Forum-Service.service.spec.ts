/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FanaticForumServiceService } from './Fanatic-Forum-Service.service';

describe('Service: FanaticForumService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FanaticForumServiceService]
    });
  });

  it('should ...', inject([FanaticForumServiceService], (service: FanaticForumServiceService) => {
    expect(service).toBeTruthy();
  }));
});
