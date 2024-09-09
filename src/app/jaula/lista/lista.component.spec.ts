import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JaulaListaComponent } from './lista.component';

describe('JaulaListaComponent', () => {
  let component: JaulaListaComponent;
  let fixture: ComponentFixture<JaulaListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JaulaListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JaulaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
