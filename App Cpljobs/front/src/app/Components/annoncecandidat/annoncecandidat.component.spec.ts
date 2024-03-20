import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoncecandidatComponent } from './annoncecandidat.component';

describe('AnnoncecandidatComponent', () => {
  let component: AnnoncecandidatComponent;
  let fixture: ComponentFixture<AnnoncecandidatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnoncecandidatComponent]
    });
    fixture = TestBed.createComponent(AnnoncecandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
