import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubordonneComponent } from './addsubordonne.component';

describe('AddsubordonneComponent', () => {
  let component: AddsubordonneComponent;
  let fixture: ComponentFixture<AddsubordonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsubordonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsubordonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
