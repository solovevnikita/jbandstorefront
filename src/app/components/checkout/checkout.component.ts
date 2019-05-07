import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DaDataConfig, DaDataType, NgxDaDataService} from '@kolkov/ngx-dadata';

import { ErrorService } from 'src/app/_services';
import { CustomerOrdersService } from 'src/app/api/api';
import { AddressModel, CustomerOrderModel } from 'src/app/model/models';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from './../../datepicker-format';
import { BasketService } from 'src/app/_services/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  providers: [
    {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
   ]
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  addressConfig: DaDataConfig;
  address: AddressModel;
  orderInfo: CustomerOrderModel;
  constructor(
    private router: Router,
    private errorService: ErrorService,
    private formBuilder: FormBuilder,
    private daDataService: NgxDaDataService,
    private customerOrders: CustomerOrdersService,
    private basketService: BasketService
  ) {
    this.checkoutForm = this.formBuilder.group({
      deliveryDate: new FormControl(),
      deliveryTime: new FormControl(),
      customerFullName: new FormControl(),
      customerPhone: new FormControl(),
      recipientFullName: new FormControl(),
      recipientPhone: new FormControl(),
      comment: new FormControl(),
      isRecipient: new FormControl(),
      isCallAllowed: new FormControl(),
      isDeliveryNotifications: new FormControl(),
      address: new FormControl()
    });
  }
  // getter для удобства получения доступа к полям
  get f() { return this.checkoutForm.controls; }
  goToBasket() {
    this.router.navigate(['/basket']);
  }
  toggleDisableRecipient() {
    if (this.f.isRecipient.value) {
      this.f.recipientFullName.disable();
      this.f.recipientPhone.disable();
      return;
    }
    this.f.recipientFullName.enable();
    this.f.recipientPhone.enable();
    return;
  }
  async goToPayment() {
    const _deliveryDateTime = new Date(this.f.deliveryDate.value.year,
      this.f.deliveryDate.value.month - 1, this.f.deliveryDate.value.day,
      this.f.deliveryTime.value.hour, this.f.deliveryTime.value.minute, this.f.deliveryTime.value.second);

    await this.daDataService.getData(this.f.address.value, DaDataType.address, 1)
      .toPromise()
        .then(
          (res: any) => {
            if (res.suggestions.length) {
              this.address = {
                address: res.suggestions[0].value,
                country: res.suggestions[0].data.country,
                postalCode: res.suggestions[0].data.postalCode,
                region: res.suggestions[0].data.region,
                area: res.suggestions[0].data.area,
                city: res.suggestions[0].data.city,
                street: res.suggestions[0].data.street,
                house: res.suggestions[0].data.house,
                flat: res.suggestions[0].data.flat,
                geoLat: res.suggestions[0].data.geo_lat,
                geoLon: res.suggestions[0].data.geo_lon
              };
            }
          }
        );
    this.orderInfo = {
      deliveryDate: _deliveryDateTime.toISOString(),
      address: this.address,
      customerFullName: this.f.customerFullName.value,
      customerPhone: this.f.customerPhone.value,
      recipientFullName: this.f.recipientFullName.value,
      recipientPhone: this.f.recipientPhone.value,
      comment: this.f.comment.value || null,
      isDeliveryNotifications: this.f.isDeliveryNotifications.value,
      isRecipient: this.f.isRecipient.value,
      isCallAllowed: this.f.isCallAllowed.value,
    };
    this.errorService.getForm(this.checkoutForm);
    this.customerOrders.customerOrdersCreate(this.orderInfo).subscribe(
      res => {
        window.location.href = res.paymentUri;
        this.basketService.basketItemsCounterSource.next(null);
      }
    );
  }
  async ngOnInit() {
    const inputElementHour = <HTMLCollectionOf<Element>>document.getElementsByClassName('ngb-tp-hour');
    inputElementHour[0].children[0].setAttribute('placeholder', 'ЧЧ');
    const inputElementMinute = <HTMLCollectionOf<Element>>document.getElementsByClassName('ngb-tp-minute');
    inputElementMinute[0].children[0].setAttribute('placeholder', 'ММ');
    this.addressConfig = {
      apiKey: '2e51c5fbc1a60bd48face95951108560bf03f7d9',
      type: DaDataType.address
    };
    await this.customerOrders.customerOrdersGetLastInfo().toPromise().then(
      res => {

        res.customerPhone = res.customerPhone ? res.customerPhone.substring(1) : res.customerPhone;
        res.recipientPhone = res.recipientPhone ? res.recipientPhone.substring(1) : res.recipientPhone;
        if (res.address == null) {
          res.address = { address: null, country: null, geoLat: null, geoLon: null };
        }

        const lastOrderDate = new Date(res.deliveryDate);
        const resObj = {
          deliveryDate: {
            year: lastOrderDate.getFullYear(),
            month: lastOrderDate.getMonth() + 1,
            day: lastOrderDate.getDate()
          },
          deliveryTime: {
            hour: lastOrderDate.getHours(),
            minute: lastOrderDate.getMinutes(),
            second: lastOrderDate.getSeconds()
          },
          customerFullName: res.customerFullName,
          customerPhone: res.customerPhone,
          recipientFullName: res.recipientFullName,
          recipientPhone: res.recipientPhone,
          comment: res.comment,
          isRecipient: res.isRecipient,
          isCallAllowed: res.isCallAllowed,
          isDeliveryNotifications: res.isDeliveryNotifications,
          address: res.address.address
        };
        if (this.checkoutForm) {
          this.checkoutForm.setValue(resObj);
        } else {
          this.checkoutForm = this.formBuilder.group(resObj);
        }
      }
    );
    setTimeout(() => this.toggleDisableRecipient());
  }
}
