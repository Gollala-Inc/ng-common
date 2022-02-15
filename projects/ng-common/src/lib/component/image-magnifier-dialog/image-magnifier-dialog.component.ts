import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'lib-image-magnifier-dialog',
  templateUrl: './image-magnifier-dialog.component.html',
  styleUrls: ['./image-magnifier-dialog.component.scss']
})
export class ImageMagnifierDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImageMagnifierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { src: string },
  ) { }

  ngOnInit() {
  }

  onCloseDialog() {
    this.dialogRef.close();
  }

}
