import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AuthAccountsService, CustomerReviewsService, CustomerAccountService,
    CustomerBasketService, CustomerContentService, CustomerOrdersService, CustomerProductsService  } from './api/api';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AuthAccountsService,
    CustomerAccountService,
    CustomerBasketService,
    CustomerContentService,
    CustomerOrdersService,
    CustomerProductsService,
    CustomerReviewsService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule!');
        }
    }
}
