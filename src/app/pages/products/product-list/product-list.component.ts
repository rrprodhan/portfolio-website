import { Component, DestroyRef, inject } from "@angular/core";
import { ProductsService } from "../../../services/products.service";
import { AsyncPipe } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { IProduct } from "../../../models/IProduct";
import { debounceTime, distinctUntilChanged, of, switchMap } from "rxjs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { MatButtonModule } from "@angular/material/button";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from "../../../components/confirm-dialog/confirm-dialog.component";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [
    AsyncPipe,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.scss",
})
export class ProductListComponent {
  productService = inject(ProductsService);
  destroyedRef = inject(DestroyRef);
  readonly dialog = inject(MatDialog);

  productList$ = this.productService.getProductList();
  productListByCategory$ = this.productService.getProductListByCategory("");

  displayedColumns: string[] = [
    "title",
    "description",
    "price",
    "action",
  ];
  searchFormControl = new FormControl();

  ngOnInit(): void {
    this.searchFormControl.valueChanges
      .pipe(
        debounceTime(800),
        distinctUntilChanged(),
        switchMap((searchTerm: string) => {
          return searchTerm === ""
            ? this.productService.getProductList()
            : this.productService.getProductListByCategory(searchTerm);
        })
      )
      .subscribe((productList: IProduct[]) => {
        this.productList$ = of(productList ?? []);
      });
  }

  deleteProduct(id: number) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      width: "420px",
      closeOnNavigation: true,
      disableClose: true,
      data: {
        title: `Confirm Action`,
        message: `Are you sure you want to delete this product?`,
        button: {
          ok: { text: "Yes", color: "" },
          cancel: { text: "No", color: "accent" },
        },
      },
    });

    confirmDialog
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe((result) => {
        if (result?.isConfirmed !== undefined && result?.isConfirmed) {
          this.productService
            .deleteProduct(id)
            .pipe(takeUntilDestroyed(this.destroyedRef))
            .subscribe((success) => {
              if (success) {
                this.productList$ = this.productService.getProductList();
              }
            });
        }
      });
  }
}
