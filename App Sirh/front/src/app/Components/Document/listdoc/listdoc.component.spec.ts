import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdocComponent } from './listdoc.component';

describe('ListdocComponent', () => {
  let component: ListdocComponent;
  let fixture: ComponentFixture<ListdocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListdocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
