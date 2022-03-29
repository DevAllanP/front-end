import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesproduitComponent } from './typesproduit.component';

describe('TypesproduitComponent', () => {
  let component: TypesproduitComponent;
  let fixture: ComponentFixture<TypesproduitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypesproduitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypesproduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
