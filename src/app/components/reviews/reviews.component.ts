import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

import { CustomerReviewsService } from 'src/app/api/api';

import { CustomerReviewListModel } from 'src/app/model/models';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
  providers: [NgbCarouselConfig]
})
export class ReviewsComponent implements OnInit {
  showNavigationIndicators = false;

  reviews: CustomerReviewListModel;
  constructor(private reviewsService: CustomerReviewsService) { }

  ngOnInit() {
    this.reviewsService.customerReviewsList().subscribe(
      (res: any) => this.reviews = res,
      err => console.log(err.message)
    );
  }
}
