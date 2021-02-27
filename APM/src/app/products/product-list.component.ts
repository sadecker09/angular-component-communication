import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { NgModel } from "@angular/forms";
import { CriteriaComponent } from "../shared/criteria/criteria.component";

import { IProduct } from "./product";
import { ProductParameterService } from "./product-parameter.service";
import { ProductService } from "./product.service";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;
  includeDetail: boolean = true;
  @ViewChild(CriteriaComponent) filterComponent: CriteriaComponent;
  parentListFilter: string;
  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(
    private productService: ProductService,
    private productParameterService: ProductParameterService
  ) {}

  // using service so no backing variable needed
  get showImage() {
    return this.productParameterService.showImage;
  }
  set showImage(value: boolean) {
    this.productParameterService.showImage = value;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.filterComponent.listFilter = this.productParameterService.filterBy;
        // don't need to call performFilter b/c the above set will cause
        // the child component to emit event which will call onValueChange
        // which then calls performFilter
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  ngAfterViewInit(): void {
    this.parentListFilter = this.filterComponent.listFilter;
  }

  onValueChange(value: string): void {
    this.productParameterService.filterBy = value;
    this.performFilter(value);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(
        (product: IProduct) =>
          product.productName
            .toLocaleLowerCase()
            .indexOf(filterBy.toLocaleLowerCase()) !== -1
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
}
