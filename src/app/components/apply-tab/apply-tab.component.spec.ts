import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyTabComponent } from './apply-tab.component';

describe('ApplyTabComponent', () => {
  let component: ApplyTabComponent;
  let fixture: ComponentFixture<ApplyTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
