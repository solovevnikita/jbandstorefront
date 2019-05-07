import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';

import { CustomerProductsService } from '../api/api';
import { ProductIdModel } from '../model/models';
import { SignInComponent } from '../components/sign-in';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  items: Array<any>;
  productIdModel: ProductIdModel;
  favouriteItemsCounter = 1;
  public favouriteItemsCounterSource = new BehaviorSubject(null);
  favouriteItemsCounterObs = this.favouriteItemsCounterSource.asObservable();

  constructor(
    private customerProduct: CustomerProductsService,
    private router: Router,
    private modalService: NgbModal,
    private userService: UserService
  ) { }
  async getItems() {
    const inFavorites = true;
    await this.customerProduct.customerProductsList(undefined, undefined, undefined, undefined, inFavorites)
    .toPromise()
      .then(
        res => {
          this.router.navigate(['/favorite']);
          this.items = res;
        }
    );
    return this.items;
  }
  removeItemFromFavourites(index, _productId) {
    this.productIdModel = {
      productId: _productId
    };
    if (index >= 0) {
      this.items.splice(index, 1);
    }
    this.customerProduct.customerProductsRemoveFromFavorites(this.productIdModel)
      .subscribe(
        res => {
          this.favouriteItemsCounter--;
          this.changeFavouriteItemsCounter();
        }
      );
  }
  addItemToFavourites(_productId) {
    this.productIdModel = {
      productId: _productId
    };
    this.customerProduct.customerProductsAddToFavorites(this.productIdModel)
      .subscribe(
        res => {
          this.favouriteItemsCounter++;
          this.changeFavouriteItemsCounter();
        },
        err => {
          this.modalService.open(SignInComponent, { size: 'lg', centered: true, backdropClass: 'backdrop'});
          document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
        }
      );
  }
  getFavouriteItemsCounter() {
    this.customerProduct.customerProductsGetFavoritesCount()
      .subscribe(
        res => {
          //this.userService.isUserLoggedIn.next(true);
          this.favouriteItemsCounterSource.next(res.counter);
          this.favouriteItemsCounter = res.counter;
        }
      );
  }
  changeFavouriteItemsCounter() {
    this.favouriteItemsCounterSource.next(this.favouriteItemsCounter);
  }
}
