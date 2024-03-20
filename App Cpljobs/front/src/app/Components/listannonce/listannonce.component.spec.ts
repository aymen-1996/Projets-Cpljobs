import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListannonceComponent } from './listannonce.component';

describe('ListannonceComponent', () => {
  let component: ListannonceComponent;
  let fixture: ComponentFixture<ListannonceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListannonceComponent]
    });
    fixture = TestBed.createComponent(ListannonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
