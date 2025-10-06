import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCRUDComponent } from './professor-crud.component';

describe('ProfessorCRUDComponent', () => {
  let component: ProfessorCRUDComponent;
  let fixture: ComponentFixture<ProfessorCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessorCRUDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
