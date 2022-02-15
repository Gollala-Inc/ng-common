import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMagnifierDialogComponent } from './image-magnifier-dialog.component';

describe('ImageMagnifierDialogComponent', () => {
  let component: ImageMagnifierDialogComponent;
  let fixture: ComponentFixture<ImageMagnifierDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageMagnifierDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageMagnifierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
