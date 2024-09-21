import { Component, DestroyRef, inject } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { ProductsService } from "../../../services/products.service";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { AsyncPipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { UpdateProductDetailsDialogComponent } from "../../../components/update-product-details-dialog/update-product-details-dialog.component";
import { IProduct } from "../../../models/IProduct";
import { EMPTY, switchMap, take } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-product-details",
  standalone: true,
  imports: [MatCardModule, AsyncPipe, RouterModule, MatIconModule],
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.scss",
})
export class ProductDetailsComponent {
  productService = inject(ProductsService);
  route = inject(ActivatedRoute);
  readonly dialog = inject(MatDialog);
  destroyedRef = inject(DestroyRef);

  productDetails$ = this.productService.getProductDetailsById(0);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe((params) => {
        this.productDetails$ = this.productService.getProductDetailsById(
          Number(params.get("productId") ?? 0)
        );
      });
  }

  openUpdateProductDetailsDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    productDetails: IProduct
  ): void {
    const updateProductDetailsDialog = this.dialog.open(
      UpdateProductDetailsDialogComponent,
      {
        width: "500px",
        enterAnimationDuration,
        exitAnimationDuration,
        data: {
          productDetails: productDetails,
        },
      }
    );

    updateProductDetailsDialog
      .afterClosed()
      .pipe(
        takeUntilDestroyed(this.destroyedRef),
        switchMap((result) => {
          if (result?.isConfirmed && result?.formData) {
            return this.productService.updateProductDetailsById(
              productDetails.id,
              result.formData
            );
          }
          return EMPTY;
        })
      )
      .subscribe((updatedProductDetails) => {
        if (updatedProductDetails) {
          this.productDetails$ = this.productService.getProductDetailsById(
            updatedProductDetails.id
          );
        }
      });
  }
}
