import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsersByNicknameComponent } from './search-users-by-nickname.component';

describe('SearchUsersByNicknameComponent', () => {
  let component: SearchUsersByNicknameComponent;
  let fixture: ComponentFixture<SearchUsersByNicknameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUsersByNicknameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUsersByNicknameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
