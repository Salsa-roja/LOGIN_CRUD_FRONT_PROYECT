import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAuthComponent } from './register-auth.component';

describe('RegisterAuthComponent', () => {
  let component: RegisterAuthComponent;
  let fixture: ComponentFixture<RegisterAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterAuthComponent]
    });
    fixture = TestBed.createComponent(RegisterAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
