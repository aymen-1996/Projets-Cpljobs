import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddcanComponent } from './addcan.component';



describe('AddcanComponent', () => {
  let component: AddcanComponent;
  let fixture: ComponentFixture<AddcanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
