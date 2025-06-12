import { TestBed } from '@angular/core/testing';

import { TarjetaEmbarqueService } from './tarjeta-embarque.service';

describe('TarjetaEmbarqueService', () => {
  let service: TarjetaEmbarqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TarjetaEmbarqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
