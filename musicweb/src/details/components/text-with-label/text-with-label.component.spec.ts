import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextWithLabelComponent } from './text-with-label.component';

describe('TextWithLabelComponent', () => {
  let component: TextWithLabelComponent;
  let fixture: ComponentFixture<TextWithLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextWithLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextWithLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
