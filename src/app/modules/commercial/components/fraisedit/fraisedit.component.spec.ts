import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraiseditComponent } from './fraisedit.component';

describe('FraiseditComponent', () => {
  let component: FraiseditComponent;
  let fixture: ComponentFixture<FraiseditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FraiseditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FraiseditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
