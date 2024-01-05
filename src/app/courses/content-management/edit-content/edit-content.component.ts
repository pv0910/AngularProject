import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {
  editedContent: any = {};

  constructor(
    public dialogRef: MatDialogRef<EditContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.editedContent = { ...this.data };
  }

  saveChanges(): void {
    this.dialogRef.close(this.editedContent);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
