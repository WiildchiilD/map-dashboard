import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BraceletsComponent } from './bracelets.component';

describe('BraceletsComponent', () => {
  let component: BraceletsComponent;
  let fixture: ComponentFixture<BraceletsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BraceletsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BraceletsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
