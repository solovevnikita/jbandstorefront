import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AuthAccountsService } from 'src/app/api/api';
import { AuthAccountRegisterRequestModel } from 'src/app/model/models';
import { SignInComponent } from '../sign-in/sign-in.component';
import { ErrorService } from '../../_services/error.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  protected basePath = 'https://jbandflowers.ru';
  signUpForm: FormGroup;
  newUser: AuthAccountRegisterRequestModel;
  hideSignUp: boolean;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private authAccountsService: AuthAccountsService,
    private errorService: ErrorService,
    private router: Router
  ) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.router.url === '/signup') {
          this.hideSignUp = true;
          return;
        }
        this.hideSignUp = false;
        return;
      }
    });
  }
  close() {
    this.activeModal.close();
  }
  openSignIn() {
    this.activeModal.close();
    this.modalService.open(SignInComponent, { size: 'lg', centered: true, backdropClass: 'backdrop'});
  }
  signInSocial(providerName) {
    window.location.href = `${this.basePath}/auth/v10/accounts/externalLogin?providerName=${providerName}`;
  }
  // getter для удобства получения доступа к полям
  get f() { return this.signUpForm.controls; }

  onSubmit() {
    if (!this.f.privacyNotice.value) {
      this.f.privacyNotice.setErrors({
         serverError: "Вы должны согласиться с условиями использования"
      });
      return;
    }

    this.newUser = {
      firstName: this.f.firstName.value,
      lastName: this.f.lastName.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
      password: this.f.password.value,
      passwordConfirm: this.f.passwordConfirm.value
    };
    this.errorService.getForm(this.signUpForm);
    this.authAccountsService.authAccountsRegister(this.newUser)
      .subscribe(
        res => {
          this.activeModal.close();
          document.getElementsByTagName('body')[0].style.overflowY = 'scroll';
        }
      );
  }
  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      firstName: null,
      lastName: null,
      email: null,
      phone: null,
      password: null,
      passwordConfirm: null,
      privacyNotice: null
    });
  }
}
