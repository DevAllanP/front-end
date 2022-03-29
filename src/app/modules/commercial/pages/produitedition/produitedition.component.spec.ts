import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduiteditionComponent } from './produitedition.component';

describe('ProduiteditionComponent', () => {
  let component: ProduiteditionComponent;
  let fixture: ComponentFixture<ProduiteditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduiteditionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduiteditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
