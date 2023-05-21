import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesConversationsComponent } from './messages-conversations.component';

describe('MessagesConversationsComponent', () => {
  let component: MessagesConversationsComponent;
  let fixture: ComponentFixture<MessagesConversationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesConversationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesConversationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
