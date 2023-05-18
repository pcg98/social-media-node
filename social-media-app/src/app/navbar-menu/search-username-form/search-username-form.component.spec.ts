import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUsernameFormComponent } from './search-username-form.component';

describe('SearchUsernameFormComponent', () => {
  let component: SearchUsernameFormComponent;
  let fixture: ComponentFixture<SearchUsernameFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUsernameFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUsernameFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
