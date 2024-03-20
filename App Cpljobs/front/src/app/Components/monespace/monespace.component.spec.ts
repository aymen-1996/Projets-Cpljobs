import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonespaceComponent } from './monespace.component';

describe('MonespaceComponent', () => {
  let component: MonespaceComponent;
  let fixture: ComponentFixture<MonespaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonespaceComponent]
    });
    fixture = TestBed.createComponent(MonespaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
