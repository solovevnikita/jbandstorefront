import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthAccountsService } from '../../api/api';
import { AuthAccountLoginRequestModel, ErrorModel } from '../../model/models';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { ErrorService } from '../../_services/error.service';
import { UserService } from './../../_services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  protected basePath = 'https://jbandflowers.ru';
  signInForm: FormGroup;
  submitted = false;
  error = '';
  user: AuthAccountLoginRequestModel;
  errorMessage: ErrorModel;
  hideSignIn: boolean;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private authAccounts: AuthAccountsService,
    private router: Router,
    private errorService: ErrorService,
    private modalService: NgbModal,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.router.url.lastIndexOf('/signin') === 0) {
          this.hideSignIn = true;
          return;
        }
        this.hideSignIn = false;
        return;
      }
    });
  }
  close() {
    this.activeModal.close();
    document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
  }
  openSignUp() {
    this.activeModal.close();
    this.modalService.open(SignUpComponent, { size: 'lg', centered: true, backdropClass: 'backdrop'});
  }
  signInSocial(providerName) {
    window.location.href = `${this.basePath}/auth/v10/accounts/externalLogin?providerName=${providerName}`;
  }
  // getter для удобства получения доступа к полям
  get f() { return this.signInForm.controls; }
  // login
  onSubmit() {
    this.user = {
      username: this.f.username.value,
      password: this.f.password.value
    };
    this.errorService.getForm(this.signInForm);
    this.authAccounts.authAccountsLogin(this.user)
      .subscribe(
        res => {
          this.router.navigate(['/user-profile']);
          this.userService.isUserLoggedIn.next(true);
          this.activeModal.close();
          document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
        }
      );
  }
  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      username: null,
      password: null
    });
    this.error = this.activatedRoute.snapshot.queryParams["message"];
    if (this.error) {
      this.toastr.error(this.error);
    }
  }
}
