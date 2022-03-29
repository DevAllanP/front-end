import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeproduiteditComponent } from './typeproduitedit.component';

describe('TypeproduiteditComponent', () => {
  let component: TypeproduiteditComponent;
  let fixture: ComponentFixture<TypeproduiteditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeproduiteditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeproduiteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
