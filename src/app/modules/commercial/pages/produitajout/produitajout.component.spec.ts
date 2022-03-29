import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitajoutComponent } from './produitajout.component';

describe('ProduitajoutComponent', () => {
  let component: ProduitajoutComponent;
  let fixture: ComponentFixture<ProduitajoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitajoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitajoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
