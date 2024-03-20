import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoproComponent } from './infopro.component';

describe('InfoproComponent', () => {
  let component: InfoproComponent;
  let fixture: ComponentFixture<InfoproComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoproComponent]
    });
    fixture = TestBed.createComponent(InfoproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
