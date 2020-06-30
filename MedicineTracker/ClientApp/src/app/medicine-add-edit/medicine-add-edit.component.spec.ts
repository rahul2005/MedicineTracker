import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineAddEditComponent } from './medicine-add-edit.component';

describe('MedicineAddEditComponent', () => {
  let component: MedicineAddEditComponent;
  let fixture: ComponentFixture<MedicineAddEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MedicineAddEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
