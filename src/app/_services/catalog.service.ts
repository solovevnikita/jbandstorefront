import { Injectable } from '@angular/core';

import { CustomerProductsService } from '../api/api';
import { CustomerProductModel, ProductAttributeModel } from '../model/models';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  catalogItems: Array<CustomerProductModel>;
  attributes: Array<ProductAttributeModel>;
  separatedAttr = {};
  attributesIds = [];
  limit = 9;
  constructor(
    private customerProduct: CustomerProductsService
  ) { }
  async getCatalogItems() {
    this.attributesIds = [];
    await this.customerProduct.customerProductsList(null, null, null, null, null, null, this.limit, null)
    .toPromise()
      .then(
        res => this.catalogItems = res
      );
  return this.catalogItems;
  }
  async getCatalogItemsWithFilters(withDiscount, _attributesId, offset, priceMin, priceMax) {
    if (_attributesId) {
      const index = this.attributesIds.indexOf(_attributesId);
      if (index === -1) {
        this.attributesIds.push(_attributesId);
      } else {
        this.attributesIds.splice(index, 1);
      }
    }
    withDiscount = withDiscount || null;
    await this.customerProduct
      .customerProductsList(this.attributesIds, priceMin, priceMax, withDiscount, null, null, this.limit, offset)
        .toPromise()
          .then(
            res => this.catalogItems = res
          );
    return this.catalogItems;
  }
  async getAttributes() {
    await this.customerProduct.customerProductsListAttributes()
    .toPromise()
      .then(
        res => {
          this.attributes = res;
        }
      );
    return this.separateAttributes(this.attributes);
  }
  async getCatalogItemsByCategory(withDiscount, _attributesId, offset, priceMin, priceMax) {
    this.attributesIds.splice(0, 1);
    this.attributesIds.push(_attributesId);
    withDiscount = withDiscount || null;
    await this.customerProduct
      .customerProductsList(this.attributesIds, priceMin, priceMax, withDiscount, null, null, this.limit, offset)
        .toPromise()
          .then(
            res => this.catalogItems = res
          );
    return this.catalogItems;
  }
  separateAttributes(attributes) {
    const colors = [],
          bouquetType = [],
          flowersType = [],
          occasions = [],
          itemCategory = [];
    attributes.forEach(attrElement => {
      if (attrElement.parentId !== null) {
        switch (attrElement.parentId) {
          case 100:
            itemCategory.push(attrElement);
            break;
          case 200:
            bouquetType.push(attrElement);
            break;
          case 300:
            colors.push(attrElement);
            break;
          case 400:
            flowersType.push(attrElement);
            break;
          case 500:
            occasions.push(attrElement);
            break;
          default:
            break;
        }
      }
    });
    this.separatedAttr['bouquetType'] = bouquetType;
    this.separatedAttr['flowersType'] = flowersType;
    this.separatedAttr['occasions'] = occasions;
    this.separatedAttr['itemCategory'] = itemCategory;
    this.separatedAttr['colors'] = colors;
    return this.separatedAttr;
  }
}
