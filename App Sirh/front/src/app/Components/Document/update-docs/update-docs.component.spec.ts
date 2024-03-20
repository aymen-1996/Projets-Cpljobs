import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDocsComponent } from './update-docs.component';

describe('UpdateDocsComponent', () => {
  let component: UpdateDocsComponent;
  let fixture: ComponentFixture<UpdateDocsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDocsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
