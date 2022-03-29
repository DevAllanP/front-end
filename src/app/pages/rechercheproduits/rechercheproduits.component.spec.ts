import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercheproduitsComponent } from './rechercheproduits.component';

describe('RechercheproduitsComponent', () => {
  let component: RechercheproduitsComponent;
  let fixture: ComponentFixture<RechercheproduitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RechercheproduitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercheproduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
