import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleBtnComponent } from './google-btn.component';

describe('GoogleBtnComponent', () => {
  let component: GoogleBtnComponent;
  let fixture: ComponentFixture<GoogleBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
