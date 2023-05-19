import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsersSearchComponent } from './show-users-search.component';

describe('ShowUsersSearchComponent', () => {
  let component: ShowUsersSearchComponent;
  let fixture: ComponentFixture<ShowUsersSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowUsersSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUsersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
