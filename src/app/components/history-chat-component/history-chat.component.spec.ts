import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryChatComponent } from './history-chat.component';

describe('ChatComponentComponent', () => {
  let component: HistoryChatComponent;
  let fixture: ComponentFixture<HistoryChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoryChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
