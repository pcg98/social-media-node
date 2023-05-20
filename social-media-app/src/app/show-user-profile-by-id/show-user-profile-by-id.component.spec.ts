import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserProfileByIdComponent } from './show-user-profile-by-id.component';

describe('ShowUserProfileByIdComponent', () => {
  let component: ShowUserProfileByIdComponent;
  let fixture: ComponentFixture<ShowUserProfileByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUserProfileByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserProfileByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
