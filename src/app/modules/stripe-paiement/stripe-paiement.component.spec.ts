import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripePaiementComponent } from './stripe-paiement.component';

describe('StripePaiementComponent', () => {
  let component: StripePaiementComponent;
  let fixture: ComponentFixture<StripePaiementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripePaiementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StripePaiementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
