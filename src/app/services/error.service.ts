import { inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { SnackBarService } from "./snack-bar.service";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  snackBarService = inject(SnackBarService);

  /**
   * @param operation - name of the operation that failed
   * @param errorMessage - Error message to display to the user
   * @param result - optional value to return as the observable result
   */
  public handleError<T>(
    operation = "operation",
    errorMessage = "Operation Failed!",
    result?: T
  ) {
    return (error: any): Observable<T> => {
      if (errorMessage) {
        this.snackBarService.error(
          (error?.error?.message || error?.error?.detail) ?? errorMessage
        );
      }
      return of(result as T);
    };
  }
}
