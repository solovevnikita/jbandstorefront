import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BasketService } from '../../_services/basket.service';
import { CustomerBasketModel } from 'src/app/model/models';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  items: CustomerBasketModel;
  isMobile: boolean;
  basketItemsCounter: number;
  constructor(
    private basketService: BasketService,
    private router: Router
  ) { }
  goToStore() {
    this.router.navigate(['/']);
  }
  sum(item) {
    return item.qty * item.price;
  }
  totalSum() {
    let _totalSum = 0;
    this.items.details.forEach(item => {
      _totalSum += item.price * item.qty;
    });
    return _totalSum;
  }
  reduceCount(item) {
    if (item.qty > 1) {
      item.qty--;
      this.basketService.setQuantity(item.productId, item.qty);
      return item.qty;
    }
  }
  increaseCount(item) {
    item.qty++;
    this.basketService.setQuantity(item.productId, item.qty);
    return item.qty;
  }
  removeItem(index, productId) {
    this.basketService.removeItem(index, productId);
  }
  removeAllItems() {
    this.items = this.basketService.removeAllItems();
  }
  goToItemDetails(productId) {
    this.router.navigate(['/item-details', productId]);
  }
  async ngOnInit() {
    this.items = await this.basketService.getItems();
    this.isMobile = window.innerWidth <= 768;
  }
}
