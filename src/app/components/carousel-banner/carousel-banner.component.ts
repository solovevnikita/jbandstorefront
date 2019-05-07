import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { CustomerContentService } from 'src/app/api/api';

import { BannerModel } from 'src/app/model/models';

@Component({
  selector: 'app-carousel-banner',
  templateUrl: './carousel-banner.component.html',
  styleUrls: ['./carousel-banner.component.scss'],
  providers: [NgbCarouselConfig]
})
export class CarouselBannerComponent implements OnInit {
  showNavigationArrows = false;
  banners: BannerModel;
  constructor(
    private customerContent: CustomerContentService
  ) {}
  ngOnInit() {
    this.customerContent.customerContentListBanners().subscribe(
      (res: any) => this.banners = res
    );
  }
}
