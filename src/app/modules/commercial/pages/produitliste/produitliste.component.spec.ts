import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitlisteComponent } from './produitliste.component';

describe('ProduitlisteComponent', () => {
  let component: ProduitlisteComponent;
  let fixture: ComponentFixture<ProduitlisteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitlisteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitlisteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
