import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcongeeComponent } from './addcongee.component';

describe('AddcongeeComponent', () => {
  let component: AddcongeeComponent;
  let fixture: ComponentFixture<AddcongeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcongeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcongeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
