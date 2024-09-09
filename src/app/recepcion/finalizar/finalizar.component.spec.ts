import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionFinalizarComponent } from './finalizar.component';

describe('RecepcionFinalizarComponent', () => {
  let component: RecepcionFinalizarComponent;
  let fixture: ComponentFixture<RecepcionFinalizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionFinalizarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionFinalizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
