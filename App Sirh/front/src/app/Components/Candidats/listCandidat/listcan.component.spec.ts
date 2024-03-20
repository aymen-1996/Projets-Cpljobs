import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcanComponent } from './listcan.component';

describe('ListcanComponent', () => {
  let component: ListcanComponent;
  let fixture: ComponentFixture<ListcanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
