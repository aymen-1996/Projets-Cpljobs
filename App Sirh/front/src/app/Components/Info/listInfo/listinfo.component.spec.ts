import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListinfoComponent } from './listinfo.component';

describe('ListinfoComponent', () => {
  let component: ListinfoComponent;
  let fixture: ComponentFixture<ListinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
