import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleVueloPage } from './detalle-vuelo.page';

describe('DetalleVueloPage', () => {
  let component: DetalleVueloPage;
  let fixture: ComponentFixture<DetalleVueloPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleVueloPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
