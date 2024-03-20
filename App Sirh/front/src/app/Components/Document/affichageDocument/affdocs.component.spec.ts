import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffdocsComponent } from './affdocs.component';

describe('AffdocsComponent', () => {
  let component: AffdocsComponent;
  let fixture: ComponentFixture<AffdocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffdocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffdocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
