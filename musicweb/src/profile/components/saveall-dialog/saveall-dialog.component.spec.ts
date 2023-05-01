import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveallDialogComponent } from './saveall-dialog.component';

describe('SaveallDialogComponent', () => {
  let component: SaveallDialogComponent;
  let fixture: ComponentFixture<SaveallDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveallDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveallDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
