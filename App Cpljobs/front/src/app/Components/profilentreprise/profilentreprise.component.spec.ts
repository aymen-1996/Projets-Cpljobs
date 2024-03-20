import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilentrepriseComponent } from './profilentreprise.component';

describe('ProfilentrepriseComponent', () => {
  let component: ProfilentrepriseComponent;
  let fixture: ComponentFixture<ProfilentrepriseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfilentrepriseComponent]
    });
    fixture = TestBed.createComponent(ProfilentrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
