import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSubComponent } from './update-sub.component';

describe('UpdateSubComponent', () => {
  let component: UpdateSubComponent;
  let fixture: ComponentFixture<UpdateSubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
