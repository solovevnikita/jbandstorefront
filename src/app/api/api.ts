export * from './authAccounts.service';
import { AuthAccountsService } from './authAccounts.service';
export * from './customerAccount.service';
import { CustomerAccountService } from './customerAccount.service';
export * from './customerBasket.service';
import { CustomerBasketService } from './customerBasket.service';
export * from './customerContent.service';
import { CustomerContentService } from './customerContent.service';
export * from './customerOrders.service';
import { CustomerOrdersService } from './customerOrders.service';
export * from './customerProducts.service';
import { CustomerProductsService } from './customerProducts.service';
export * from './customerReviews.service';
import { CustomerReviewsService } from './customerReviews.service';
export const APIS = [
  AuthAccountsService, CustomerAccountService, CustomerBasketService,
  CustomerContentService, CustomerOrdersService, CustomerProductsService,
  CustomerReviewsService
];
