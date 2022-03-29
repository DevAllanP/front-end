import { TestBed } from '@angular/core/testing';

import { TypeproduitService } from './typeproduit.service';

describe('TypeproduitService', () => {
  let service: TypeproduitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeproduitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
