import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Options } from 'ng5-slider';
import { Router } from '@angular/router';
import { BasketService } from '../../_services/basket.service';

import { CustomerProductModel, ProductAttributeModel } from 'src/app/model/models';
import { CatalogService } from 'src/app/_services/catalog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  @ViewChildren('checkboxes') checkboxes: QueryList<ElementRef>;
  flowers: Array<CustomerProductModel>;
  _flowers: Array<CustomerProductModel> = [];
  filters: Array<ProductAttributeModel>;
  colors: Array<any>;
  bouquetType: Array<any>;
  flowersType: Array<any>;
  occasions: Array<any>;
  itemCategory: Array<any>;
  isCollapsedPriceRange: boolean;
  isCollapsedFlowers: boolean;
  isCollapsedColors: boolean;
  isCollapsedOccasions: boolean;
  isCollapsedFilters: boolean;
  isCollapsedBouquets: boolean;
  withDiscount: boolean;
  minValue = 0;
  maxValue = 2000;
  options: Options = {
    floor: 0,
    ceil: 2000,
    translate: (value: number): string => {
      return value + '&#8381;';
    }
  };
  constructor(
    private basketService: BasketService,
    private catalogService: CatalogService,
    private router: Router
  ) { }
  // Добавление в корзину
  addToBasket(productId) {
    this.basketService.addToBasket(productId);
  }
  // Переход на страницу товара
  goToItemDetails(productId) {
    this.router.navigate(['/item-details', productId]);
  }
  // Сброс фильтров
  removeFilters() {
    this.checkboxes.forEach((element) => {
      element.nativeElement.checked = false;
    });
    this.maxValue = 2000;
    this.minValue = 0;
    this.getItems();
  }
  // Получение всех товаров
  async getItems() {
    return this.flowers = await this.catalogService.getCatalogItems();
  }
  // Фильтрация по стоимости
  async getItemsByPrice() {
    this.flowers = await this.catalogService
                    .getCatalogItemsWithFilters(this.withDiscount, null, null, this.minValue, this.maxValue);
  }
  // Фильтрация по аттрибутам товаров
  async filterItems(productAttributeId) {
    this.flowers = await this.catalogService
                  .getCatalogItemsWithFilters(this.withDiscount, productAttributeId, null, this.minValue, this.maxValue);
  }
  // Товары со скидкой
  async getItemsWithDiscount() {
    this.flowers = await this.catalogService
                    .getCatalogItemsWithFilters(this.withDiscount, null, null, this.minValue, this.maxValue);
  }
  // Товары по категориям
  async getItemsByCategory(productAttributeId) {
    this.flowers = await this.catalogService
                    .getCatalogItemsByCategory(this.withDiscount, productAttributeId, null, this.minValue, this.maxValue);
  }
  // Товары-бестселлеры
  async getBestsellersItems() {
    this.flowers = await this.catalogService
                    .getCatalogItemsWithFilters(this.withDiscount, null, null, this.minValue, this.maxValue);
  }
  // Показать больше товаров
  async showMore() {
    const offset = this.flowers.length;
    this._flowers = await this.catalogService
                    .getCatalogItemsWithFilters(this.withDiscount, null, offset, this.minValue, this.maxValue);
    this._flowers.forEach(elem =>
      this.flowers.push(elem)
    );
  }
  async ngOnInit() {
    this.getItems();
    this._flowers.length = 9;
    // Получение фильтров
    await this.catalogService
      .getAttributes()
        .then(
          (attribures: any) => {
            this.colors = attribures.colors;
            this.bouquetType = attribures.bouquetType;
            this.flowersType = attribures.flowersType;
            this.occasions = attribures.occasions;
            this.itemCategory = attribures.itemCategory;
          }
        );
  }
}
