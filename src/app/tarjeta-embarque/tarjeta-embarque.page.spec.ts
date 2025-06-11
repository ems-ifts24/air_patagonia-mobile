import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TarjetaEmbarquePage } from './tarjeta-embarque.page';

describe('TarjetaEmbarquePage', () => {
  let component: TarjetaEmbarquePage;
  let fixture: ComponentFixture<TarjetaEmbarquePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetaEmbarquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
