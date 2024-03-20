import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddemComponent } from './adddem.component';

describe('AdddemComponent', () => {
  let component: AdddemComponent;
  let fixture: ComponentFixture<AdddemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
