import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { CustomerReviewsService } from 'src/app/api/api';
import { CustomerReviewCreateModel } from 'src/app/model/models';
import { ErrorService } from 'src/app/_services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-send-review',
  templateUrl: './send-review.component.html',
  styleUrls: ['./send-review.component.scss']
})
export class SendReviewComponent implements OnInit, OnDestroy {
  private sub: any;
  orderDetailId: number;
  review: CustomerReviewCreateModel;
  isSend: boolean;
  reviewForm: FormGroup;
  constructor(
    private reviewsService: CustomerReviewsService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private router: Router
  ) { }
  onSubmit() {
    this.review = {
      rating: this.f.rating.value,
      reviewText: this.f.reviewText.value,
      orderDetailId: this.orderDetailId
    };
    this.errorService.getForm(this.reviewForm);
    this.reviewsService.customerReviewsCreate(this.review).subscribe(
      res => {
        this.toastr.success('Спасибо за обратную связь! Отзыв отправлен.')
        this.router.navigate(['/user-profile']);
      }
    );
  }
  // getter для удобства получения доступа к полям
  get f() { return this.reviewForm.controls; }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.orderDetailId = +params['orderDetailId'];
    });
    this.reviewForm = this.formBuilder.group({
      reviewText: null,
      rating: null
    });

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
