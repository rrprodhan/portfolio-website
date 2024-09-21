import { inject, Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class SnackBarService {
  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  public success(message: string): void {
    this._snackBar.open(message ?? "Operation Successful", "ok", {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: "left",
      verticalPosition: "bottom",
    });
  }

  public error(message: string): void {
    this._snackBar.open(message ?? "Operation Failed!", "ok", {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: "left",
      verticalPosition: "bottom",
    });
  }
}
