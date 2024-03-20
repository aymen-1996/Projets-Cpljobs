import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdemComponent } from './listdem.component';

describe('ListdemComponent', () => {
  let component: ListdemComponent;
  let fixture: ComponentFixture<ListdemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListdemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
