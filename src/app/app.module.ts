import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { routing } from './routing';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxGalleryModule } from 'ngx-gallery';
import { ApiModule } from './api.module';
import { registerLocaleData } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgxDaDataModule } from '@kolkov/ngx-dadata';
import { NgxMaskModule } from 'ngx-mask';

import localeRu from '@angular/common/locales/ru';
registerLocaleData(localeRu);

import { AppComponent } from './app.component';
import { HeaderComponent, MainPageComponent, CarouselBannerComponent,
         CatalogComponent, ReviewsComponent, FooterComponent, SubscribeComponent,
         SignUpComponent, SignInComponent, BasketComponent, FavouriteComponent,
         SendReviewComponent, CheckoutComponent, UserProfileComponent,
         ItemDetailsComponent, ContentComponent } from './components';
import { NumberFormatPipe } from './pipes/number-format.pipe';
import { Interceptor } from './interceptor/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    CarouselBannerComponent,
    CatalogComponent,
    ReviewsComponent,
    FooterComponent,
    SubscribeComponent,
    SignUpComponent,
    SignInComponent,
    BasketComponent,
    FavouriteComponent,
    SendReviewComponent,
    CheckoutComponent,
    UserProfileComponent,
    ItemDetailsComponent,
    ContentComponent,
    NumberFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularSvgIconModule,
    BrowserAnimationsModule,
    routing,
    NgbModule,
    NgScrollbarModule,
    Ng5SliderModule,
    NgxGalleryModule,
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDaDataModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot()
  ],
  providers: [
    NumberFormatPipe,
    NgbActiveModal,
    { provide: LOCALE_ID, useValue: 'ru-RU' },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor,  multi: true }
  ],
  entryComponents: [SignInComponent, SignUpComponent],
  bootstrap: [AppComponent]
})

export class AppModule { }
