import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PodiumItemComponent } from './podium-item.component';

describe('PodiumItemComponent', () => {
  let component: PodiumItemComponent;
  let fixture: ComponentFixture<PodiumItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PodiumItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PodiumItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
