import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

import { IProduct } from "../product";
import { ProductService } from "../product.service";

@Component({
  selector: "pm-product-shell-list",
  templateUrl: "./product-shell-list.component.html",
})
export class ProductShellListComponent implements OnInit, OnDestroy {
  pageTitle: string = "Products";
  errorMessage: string;
  products: IProduct[];
  selectedProduct: IProduct | null;
  sub: Subscription;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      (selectedProduct) => {
        if (selectedProduct) {
          this.selectedProduct = selectedProduct;
        }
      }
    );

    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSelected(product: IProduct) {
    this.productService.changeSelectedProduct(product);
  }
}
