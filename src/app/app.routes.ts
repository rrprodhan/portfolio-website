import { Routes } from "@angular/router";
import { PageNotFoundComponent } from "./pages/page-not-found/page-not-found.component";
import { ProductListComponent } from "./pages/products/product-list/product-list.component";
import { ProductDetailsComponent } from "./pages/products/product-details/product-details.component";

export const routes: Routes = [
  { path: "product-list", component: ProductListComponent },
  {
    path: "product-list/:productId",
    loadComponent: () =>
      import("./pages/products/product-details/product-details.component").then(
        (mod) => mod.ProductDetailsComponent
      ),
  },
  { path: "", redirectTo: "/product-list", pathMatch: "full" },
  { path: "**", component: PageNotFoundComponent },
];
