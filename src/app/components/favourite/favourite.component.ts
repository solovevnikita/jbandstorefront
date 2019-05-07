import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BasketService } from 'src/app/_services/basket.service';
import { FavouriteService } from 'src/app/_services/favourite.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {
  items: Array<any>;
  constructor(
    private basketSevice: BasketService,
    private router: Router,
    private favouriteService: FavouriteService
  ) { }

  addToBasket(item) {
    this.basketSevice.addToBasket(item);
  }
  goToStore() {
    this.router.navigate(['/']);
  }
  goToItemDetails(productId) {
    this.router.navigate(['/item-details', productId]);
  }
  removeItem(index, productId) {
    this.favouriteService.removeItemFromFavourites(index, productId);
  }
  async ngOnInit() {
    this.items = await this.favouriteService.getItems();
  }
}
