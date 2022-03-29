import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoordonnerComponent } from './coordonner.component';

describe('CoordonnerComponent', () => {
  let component: CoordonnerComponent;
  let fixture: ComponentFixture<CoordonnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoordonnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoordonnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
