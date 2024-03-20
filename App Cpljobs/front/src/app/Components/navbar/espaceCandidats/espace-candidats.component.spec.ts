import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaceCandidatsComponent } from './espace-candidats.component';

describe('EspaceCandidatsComponent', () => {
  let component: EspaceCandidatsComponent;
  let fixture: ComponentFixture<EspaceCandidatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EspaceCandidatsComponent]
    });
    fixture = TestBed.createComponent(EspaceCandidatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
