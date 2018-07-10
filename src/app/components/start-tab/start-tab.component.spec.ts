import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTabComponent } from './start-tab.component';

describe('StartTabComponent', () => {
  let component: StartTabComponent;
  let fixture: ComponentFixture<StartTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
