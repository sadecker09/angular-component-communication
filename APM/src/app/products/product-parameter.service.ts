import { Injectable } from "@angular/core";

// sole purpose of this service is to be a property bag
@Injectable()
export class ProductParameterService {
  showImage: boolean;
  filterBy: string;

  constructor() {}
}
