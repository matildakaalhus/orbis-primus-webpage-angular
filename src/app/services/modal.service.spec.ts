import { TestBed, inject } from '@angular/core/testing';

import { ModalService } from './modal.service';

describe('ModalServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService]
    });
  });

  it('should be created', inject([ModalService], (service: ModalServiceService) => {
    expect(service).toBeTruthy();
  }));
});
