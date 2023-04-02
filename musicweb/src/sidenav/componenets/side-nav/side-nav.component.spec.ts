import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
