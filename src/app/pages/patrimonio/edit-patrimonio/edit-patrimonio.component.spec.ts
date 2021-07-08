import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatrimonioComponent } from './edit-patrimonio.component';

describe('EditPatrimonioComponent', () => {
  let component: EditPatrimonioComponent;
  let fixture: ComponentFixture<EditPatrimonioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatrimonioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPatrimonioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
