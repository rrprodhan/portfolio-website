import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IProduct } from '../../models/IProduct';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  productDetails: IProduct
}

@Component({
  selector: 'app-update-product-details-dialog',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './update-product-details-dialog.component.html',
  styleUrl: './update-product-details-dialog.component.scss'
})
export class UpdateProductDetailsDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<UpdateProductDetailsDialogComponent>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly formBuilder = inject(FormBuilder);

  updateProductDetailsForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.updateProductDetailsForm = this.formBuilder.group({
      title: [this.data.productDetails.title ?? ""],
      description: [this.data.productDetails.description ?? ""],
      price: [this.data.productDetails.price ?? 0],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.updateProductDetailsForm.invalid) {
      this.updateProductDetailsForm.markAllAsTouched();
      return;
    }

    this.dialogRef.close({ isConfirmed: true, formData: this.updateProductDetailsForm.value });
  }
}
