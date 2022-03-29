import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCoordComponent } from './modal-coord.component';

describe('ModalCoordComponent', () => {
  let component: ModalCoordComponent;
  let fixture: ComponentFixture<ModalCoordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalCoordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCoordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
