import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilrecComponent } from './profilrec.component';

describe('ProfilrecComponent', () => {
  let component: ProfilrecComponent;
  let fixture: ComponentFixture<ProfilrecComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilrecComponent]
    });
    fixture = TestBed.createComponent(ProfilrecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
