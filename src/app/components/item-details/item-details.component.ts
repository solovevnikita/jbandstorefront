import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { CustomerProductsService, CustomerReviewsService } from 'src/app/api/api';
import { CustomerProductModel, CustomerReviewListModel, ProductIdModel } from 'src/app/model/models';
import { BasketService } from 'src/app/_services/basket.service';
import { FavouriteService } from 'src/app/_services/favourite.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[] = [];
  selected1 = 1;
  selected2 = 2;
  selected3 = 3;
  selected4 = 4;
  selected5 = 5;
  productId: number;
  _inFavorites: boolean;
  flower: CustomerProductModel;
  similarItems: CustomerProductModel;
  reviews: CustomerReviewListModel;
  productIdModel: ProductIdModel;
  constructor(
    private route: ActivatedRoute,
    private customerProduct: CustomerProductsService,
    private customerReviews: CustomerReviewsService,
    private basketService: BasketService,
    private favouriteService: FavouriteService,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.basketService.changeBasketItemsCounter();
    this.route.params.subscribe(params => {
      this.productId = +params['productId'];
      this.refreshProductInfo();
    });

    this.galleryOptions = [
      {
        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        width: '480px',
        height: '690px',
        thumbnailsColumns: 5,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 1024,
        width: '390px',
        height: '545px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailsColumns: 3,
        thumbnailMargin: 20
      },
      {
        breakpoint: 425,
        width: '300px',
        height: '400px',
        thumbnailsPercent: 40,
        thumbnailsColumns: 3,
        preview: false
      },
      {
        breakpoint: 320,
        width: '260px',
        height: '295px',
        thumbnails: false,
        preview: false
      }
    ];
  }
  refreshProductInfo() {
    this.customerProduct.customerProductsGet(this.productId).subscribe(
      (res: any) => {
        this.flower = res;
        this._inFavorites = res.inFavorites;
        this.galleryImages = [];
        this.flower.photos.forEach(
          element => {
            const images = {
              small: element.fileName130,
              medium: element.fileName640,
              big: element.fileName1280
            };
            this.galleryImages.push(images);
        }
        );
      }
    );
    this.customerReviews.customerReviewsList(this.productId, 3).subscribe(
      (res: any) => this.reviews = res
    );
    this.customerProduct.customerProductsListSimilar(this.productId).subscribe(
      (res: any) => this.similarItems = res
    );
  }
  addToFavourite() {
    this._inFavorites = true;
    this.favouriteService.addItemToFavourites(this.productId);
  }
  addToBasket(productId = this.productId) {
    this.basketService.addToBasket(productId);
  }
  removeItem(productId) {
    this._inFavorites = false;
    this.favouriteService.removeItemFromFavourites(undefined, productId);
  }
  goToItemDetails(productId) {
    this.router.navigate(['/item-details', productId]);
  }
}
