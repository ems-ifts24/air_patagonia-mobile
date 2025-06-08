import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MisVuelosComponent } from './mis-vuelos.component';

describe('MisVuelosComponent', () => {
  let component: MisVuelosComponent;
  let fixture: ComponentFixture<MisVuelosComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MisVuelosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MisVuelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
