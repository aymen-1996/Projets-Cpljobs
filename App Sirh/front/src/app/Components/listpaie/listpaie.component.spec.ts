import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpaieComponent } from './listpaie.component';

describe('ListpaieComponent', () => {
  let component: ListpaieComponent;
  let fixture: ComponentFixture<ListpaieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpaieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpaieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
