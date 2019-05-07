import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { CustomerAccountService, CustomerOrdersService } from '../api/api';
import { SignInComponent } from '../components/sign-in';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private customerOrders: CustomerOrdersService,
    private customerAccount: CustomerAccountService,
    private modalService: NgbModal,
    private router: Router
  ) { }
  async getUser() {
    await this.customerAccount.customerAccountGetProfileInfo().toPromise().then(res => this.isUserLoggedIn.next(true));
  }
  getUserInfo() {
    this.customerAccount.customerAccountGetProfileInfo()
    .subscribe(
      res => {
        this.router.navigate(['/user-profile']);
      },
      err => {
        this.modalService.open(SignInComponent, { size: 'lg', centered: true, backdropClass: 'backdrop'});
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
      }
    );
  }
  getUserOrders() {
    this.customerOrders.customerOrdersList().subscribe(
      res => res
    );
  }
}
