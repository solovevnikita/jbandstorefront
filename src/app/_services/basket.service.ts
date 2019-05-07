import { Injectable } from '@angular/core';
import { take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ProductIdModel, CustomerBasketModel, CustomerBasketSetQuantityRequestModel } from '../model/models';

import { SignInComponent } from '../components/sign-in/sign-in.component';
import { CustomerBasketService } from '../api/api';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })

export class BasketService {
  basketInfo: CustomerBasketModel;
  basketSetQuantity: CustomerBasketSetQuantityRequestModel;
  basketItemsCounter = 1;
  _productIdModel: ProductIdModel = {
    productId: null
  };
  public basketItemsCounterSource = new BehaviorSubject(null);
  basketItemsCounterObs = this.basketItemsCounterSource.asObservable();

  constructor(
    private customerBasket: CustomerBasketService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router,
    private userService: UserService
  ) { }
  addToBasket(_productId) {
    this._productIdModel = {
      productId: _productId
    };
    this.customerBasket.customerBasketAddProduct(this._productIdModel)
      .subscribe(
        res => {
          this.basketItemsCounter++;
          this.toastr.success('Товар в корзине')
            .onTap
            .pipe(take(1))
            .subscribe(() => this.router.navigate(['/basket']));
          this.changeBasketItemsCounter();
        },
        err => {
          this.modalService.open(SignInComponent, { size: 'lg', centered: true, backdropClass: 'backdrop'});
          document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
        }
      );
  }
  async getItems() {
    await this.customerBasket.customerBasketGet()
      .toPromise()
        .then(
          res => {
            this.basketInfo = res;
            this.router.navigate(['/basket']);
          },
          err => {
            this.modalService.open(SignInComponent, { size: 'lg', centered: true, backdropClass: 'backdrop'});
            document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
          }
        );
    return this.basketInfo;
  }
  setQuantity(productId, qty) {
    this.basketSetQuantity = {
      productId: productId,
      qty: qty
    };
    this.customerBasket.customerBasketSetQuantity(this.basketSetQuantity).subscribe();
  }
  removeItem(index, selectedProductId) {
    this.basketItemsCounter--;
    this._productIdModel.productId = selectedProductId;
    this.basketInfo.details.splice(index, 1); // удаление элемента из переменной
    this.customerBasket.customerBasketRemoveProduct(this._productIdModel).subscribe();
    this.changeBasketItemsCounter();
  }
  removeAllItems() {
    this.customerBasket.customerBasketClear().subscribe();
    this.basketInfo = {
      deliverySum: null,
      details: [],
      totalSum: null
    };
    return (this.basketInfo);
  }
  async getBasketItemsCounter() {
    await this.customerBasket.customerBasketGetCount()
      .toPromise().then(
        res => {
          //this.userService.isUserLoggedIn.next(true);
          this.basketItemsCounterSource.next(res.counter);
          this.basketItemsCounter = res.counter;
        }
      );
  }
  changeBasketItemsCounter() {
    this.basketItemsCounterSource.next(this.basketItemsCounter);
  }
}
