import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcongeeComponent } from './listcongee.component';

describe('ListcongeeComponent', () => {
  let component: ListcongeeComponent;
  let fixture: ComponentFixture<ListcongeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcongeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcongeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
