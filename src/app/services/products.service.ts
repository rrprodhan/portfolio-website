import { DestroyRef, inject, Injectable } from "@angular/core";
import { catchError, Observable, take, tap } from "rxjs";
import { environment } from "../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { ErrorService } from "./error.service";
import { IProduct } from "../models/IProduct";
import { IProductPayload } from "../models/IProductPayload";
import { SnackBarService } from "./snack-bar.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  http = inject(HttpClient);
  snackBarService = inject(SnackBarService);
  errorService = inject(ErrorService);
  destroyedRef = inject(DestroyRef);

  getProductList(): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(environment.apiUrl + "/products")
      .pipe(
        catchError(
          this.errorService.handleError<IProduct[]>(
            `getProductList`,
            ``,
            []
          )
        )
      );
  }

  getProductListByCategory(category: string): Observable<IProduct[]> {
    return this.http
      .get<IProduct[]>(environment.apiUrl + "/products/category/" + category)
      .pipe(
        catchError(
          this.errorService.handleError<IProduct[]>(
            `getProductListByCategory`,
            ``,
            []
          )
        )
      );
  }

  getProductDetailsById(id: number): Observable<IProduct> {
    return this.http
      .get<IProduct>(environment.apiUrl + "/products/" + id)
      .pipe(
        catchError(
          this.errorService.handleError<IProduct>(
            `getProductDetailsById`,
            ``,
            undefined
          )
        )
      );
  }

  updateProductDetailsById(id: number, payload: IProductPayload): Observable<IProduct> {
    return this.http
      .put<IProduct>(
        environment.apiUrl +
          "/products/" +
          id,
          payload
      )
      .pipe(
        takeUntilDestroyed(this.destroyedRef),
        tap((res) => {
          this.snackBarService.success(
            "Successfully updated product details"
          );
        }),
        catchError(
          this.errorService.handleError<IProduct>(
            `updateProductDetailsById`,
            `Could not update product details!`,
            undefined
          )
        )
      );
  }

  addProduct(payload: IProductPayload): Observable<IProduct> {
    return this.http
      .post<IProduct>(
        environment.apiUrl + "/products/", payload
      )
      .pipe(
        takeUntilDestroyed(this.destroyedRef),
        tap((res) => {
          this.snackBarService.success(
            "Successfully added the new product"
          );
        }),
        catchError(
          this.errorService.handleError<IProduct>(
            `addProduct`,
            `Could not add the new product!`,
            undefined
          )
        )
      );
  }

  deleteProduct(id: number): Observable<IProduct> {
    return this.http
      .delete<IProduct>(
        environment.apiUrl + "/products/" + id
      )
      .pipe(
        takeUntilDestroyed(this.destroyedRef),
        tap((res) => {
          this.snackBarService.success(
            "Successfully removed the product"
          );
        }),
        catchError(
          this.errorService.handleError<IProduct>(
            `deleteProduct`,
            `Could not remove the product!`,
            undefined
          )
        )
      );
  }
}
