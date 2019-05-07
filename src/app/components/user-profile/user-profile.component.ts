import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { CustomerOrdersService, AuthAccountsService, CustomerAccountService } from 'src/app/api/api';
import { CustomerOrderListModel, CustomerAccountProfileInfoModel } from 'src/app/model/models';
import { ErrorService } from 'src/app/_services';
import { BasketService } from 'src/app/_services/basket.service';
import { FavouriteService } from 'src/app/_services/favourite.service';
import { UserService } from 'src/app/_services/user.service';
import { OneSignalService } from 'src/app/_services/onesignal.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [OneSignalService]
})
export class UserProfileComponent implements OnInit {
  userInfoForm: FormGroup;
  submitted: boolean;
  isMobile: boolean;
  orderItems: CustomerOrderListModel;
  _errors: object;
  profileInfo: CustomerAccountProfileInfoModel;
  role: string;
  fullName: string;
  constructor(
    private customerOrders: CustomerOrdersService,
    private router: Router,
    private authAccounts: AuthAccountsService,
    private customerAccount: CustomerAccountService,
    private formBuilder: FormBuilder,
    private errorService: ErrorService,
    private toastr: ToastrService,
    private oneSignalService: OneSignalService,
    private userService: UserService,
    private basketService: BasketService,
    private favouriteService: FavouriteService
  ) { }
  sendReview(orderDetailId) {
    this.router.navigate(['/send-review', orderDetailId]);
  }
  // getter для удобства получения доступа к полям формы
  get f() { return this.userInfoForm.controls; }
  onSubmit() {
    this.profileInfo = {
      fullName: this.f.fullName.value,
      phone: this.f.phone.value,
      email: this.f.email.value
    };
    this.errorService.getForm(this.userInfoForm);
    this.customerAccount.customerAccountUpdateProfileInfo(this.profileInfo).subscribe(
      (res: any) => this.toastr.success('Изменения сохранены')
    );
  }
  logoff() {
    this.authAccounts.authAccountsLogoff().subscribe(
      (res: any) => {
        this.router.navigate(['/']);
        this.basketService.basketItemsCounterSource.next(null);
        this.favouriteService.favouriteItemsCounterSource.next(null);
        this.userService.isUserLoggedIn.next(false);
        localStorage.removeItem('currentUser');

        // init one signal service
        this.oneSignalService.init(null);
      }
    );
  }
  goToAdmin() {
    location.pathname = '/admin';
  }
  goToStore() {
    this.router.navigate(['/']);
  }
  async ngOnInit() {
    await this.basketService.getBasketItemsCounter();
    await this.favouriteService.getFavouriteItemsCounter();
    this.customerAccount.customerAccountGetProfileInfo()
      .subscribe(
        res => {
          res.phone = res.phone ? res.phone.substring(1) : res.phone;

          this.userInfoForm = this.formBuilder.group({
            fullName: res.fullName,
            phone: res.phone,
            email: res.email
          });
          this.role = res.roleCode;
          this.fullName = res.fullName;

          // init one signal service
          this.oneSignalService.init(res.userId);
        }
      );
    this.customerOrders.customerOrdersList().subscribe(
      (res: any) => this.orderItems = res
    );
    this.isMobile = window.innerWidth <= 768;
  }
}
