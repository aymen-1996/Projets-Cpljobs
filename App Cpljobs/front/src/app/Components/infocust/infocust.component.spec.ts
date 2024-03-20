import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocustComponent } from './infocust.component';

describe('InfocustComponent', () => {
  let component: InfocustComponent;
  let fixture: ComponentFixture<InfocustComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfocustComponent]
    });
    fixture = TestBed.createComponent(InfocustComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
