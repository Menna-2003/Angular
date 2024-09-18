import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPeofileComponentComponent } from './user-peofile-component.component';

describe('UserPeofileComponentComponent', () => {
  let component: UserPeofileComponentComponent;
  let fixture: ComponentFixture<UserPeofileComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPeofileComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPeofileComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
