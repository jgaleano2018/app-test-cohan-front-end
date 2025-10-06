import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCRUDComponent } from './student-crud.component';

describe('StudentCRUDComponent', () => {
  let component: StudentCRUDComponent;
  let fixture: ComponentFixture<StudentCRUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentCRUDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentCRUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
