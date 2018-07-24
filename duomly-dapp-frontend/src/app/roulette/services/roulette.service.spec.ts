import { TestBed, inject } from '@angular/core/testing';

import { RouletteService } from './roulette.service';

describe('RouletteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouletteService]
    });
  });

  it('should be created', inject([RouletteService], (service: RouletteService) => {
    expect(service).toBeTruthy();
  }));
});
