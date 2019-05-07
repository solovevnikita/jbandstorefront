import { Component, OnInit, HostListener } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

import { ContentService } from './../../_services';
import { BasketService } from './../../_services/basket.service';
import { FavouriteService } from './../../_services/favourite.service';
import { UserService } from './../../_services/user.service';
import { CustomerBasketModel } from 'src/app/model/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('200ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('200ms', style({transform: 'translateX(-100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class HeaderComponent implements OnInit {
  isOpen = true;
  isMobile = false;
  basketItemsCounter: number;
  favouriteItemsCounter: number;
  innerWidth: any;
  items: CustomerBasketModel;
  isUserLoggedIn: boolean;
  constructor(
    private basketService: BasketService,
    private favouriteService: FavouriteService,
    private userService: UserService,
    private contentService: ContentService
  ) {
    this.basketService.basketItemsCounterObs
    .subscribe(basketItemsCounter => this.basketItemsCounter = basketItemsCounter);
    this.favouriteService.favouriteItemsCounterObs
    .subscribe(favouriteItemsCounter => this.favouriteItemsCounter = favouriteItemsCounter);
  }
  onWindowResize() {
    this.isMobile = window.innerWidth <= 768;
    this.isOpen = this.isMobile ? false : true;
  }
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.onWindowResize();
  }
  openSignIn() {
    this.userService.getUserInfo();
  }
  openBasket() {
    this.basketService.getItems();
  }
  openFavourite() {
    this.favouriteService.getItems();
  }
  toggleMenu() {
    if (this.isMobile) {
      this.isOpen = !this.isOpen;
      document.getElementsByTagName('body')[0].style.overflowY = this.isOpen ? 'hidden' : 'scroll';
    }
  }
  goTo(event) {
    this.contentService.goToPage(event.target.innerHTML);
  }
  async ngOnInit() {
    this.onWindowResize();
    this.userService.isUserLoggedIn.subscribe(value => {
      this.isUserLoggedIn = value;
    });
    this.basketService.getBasketItemsCounter();
    this.favouriteService.getFavouriteItemsCounter();
    this.basketService.basketItemsCounterObs
      .subscribe(basketItemsCounter => this.basketItemsCounter = basketItemsCounter);
    this.favouriteService.favouriteItemsCounterObs
      .subscribe(favouriteItemsCounter => this.favouriteItemsCounter = favouriteItemsCounter);
    await this.userService.getUser();
  }
}
