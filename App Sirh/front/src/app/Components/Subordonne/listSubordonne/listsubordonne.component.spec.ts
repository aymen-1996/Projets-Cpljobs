import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsubordonneComponent } from './listsubordonne.component';

describe('ListsubordonneComponent', () => {
  let component: ListsubordonneComponent;
  let fixture: ComponentFixture<ListsubordonneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsubordonneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsubordonneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
