import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  data: any;
  title: string;
  message: string;

  button: {
    ok: {
      text: string;
      color: string;
    };
    cancel: {
      text: string;
      color: string;
    };
  };
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  onOkClick(): void {
    this.dialogRef.close({ isConfirmed: true });
  }

  onNoClick(): void {
    this.dialogRef.close({ isConfirmed: false });
  }
}
