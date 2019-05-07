import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent, BasketComponent, FavouriteComponent,
  SendReviewComponent, CheckoutComponent, UserProfileComponent,
  ItemDetailsComponent, ContentComponent, SignUpComponent, SignInComponent } from '../app/components';

const appRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    pathMatch: 'full'
  },
  {
    path: 'basket',
    component: BasketComponent,
    data: { title: 'Корзина' }
  },
  {
    path: 'favorite',
    component: FavouriteComponent,
    data: { title: 'Избранное' }
  },
  {
    path: 'send-review/:orderDetailId',
    component: SendReviewComponent,
    data: { title: 'Написать отзыв' }
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { title: 'Оформление заказа' }
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    data: { title: 'Профиль' }
  },
  {
    path: 'item-details/:productId',
    component: ItemDetailsComponent,
    data: { title: 'Карточка товара' }
  },
  {
    path: 'partners',
    component: ContentComponent,
    data: { title: 'Партнеры' }
  },
  {
    path: 'delivery',
    component: ContentComponent,
    data: { title: 'Условия доставки' }
  },
  {
    path: 'about',
    component: ContentComponent,
    data: { title: 'О нас' }
  },
  {
    path: 'contacts',
    component: ContentComponent,
    data: { title: 'Контакты' }
  },
  {
    path: 'faq',
    component: ContentComponent,
    data: { title: 'Часто задаваемые вопросы' }
  },
  {
    path: 'how-to-order',
    component: ContentComponent,
    data: { title: 'Как заказать' }
  },
  {
    path: 'payment-methods',
    component: ContentComponent,
    data: { title: 'Методы оплаты' }
  },
  {
    path: 'loyalty-program',
    component: ContentComponent,
    data: { title: 'Программа лояльности' }
  },
  {
    path: 'return-policy',
    component: ContentComponent,
    data: { title: 'Правила возврата' }
  },
  {
    path: 'oferta',
    component: ContentComponent,
    data: { title: 'Публичная оферта' }
  },
  {
    path: 'customers',
    component: ContentComponent,
    data: { title: 'Покупателям' }
  },
  {
    path: 'documents',
    component: ContentComponent,
    data: { title: 'Документы' }
  },
  {
    path: 'help',
    component: ContentComponent,
    data: { title: 'Помощь' }
  },
  {
    path: 'agreement',
    component: ContentComponent,
    data: { title: 'Пользовательское соглашение' }
  },
  {
    path: 'agent',
    component: ContentComponent,
    data: { title: 'Партнерское соглашение' }
  },
  {
    path: 'confidential',
    component: ContentComponent,
    data: { title: 'Политика конфиденциальности' }
  },
  {
    path: 'privacy',
    component: ContentComponent,
    data: { title: 'Соглашение об обработке персональных данных' }
  },
  {
    path: 'how-to-care-for-flowers',
    component: ContentComponent,
    data: { title: 'Как ухаживать за цветами' }
  },
  {
    path: 'signin',
    component: SignInComponent,
    data: { title: 'Авторизация' }
  },
  {
    path: 'signup',
    component: SignUpComponent,
    data: { title: 'Регистрация' }
  },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes, {scrollPositionRestoration: 'enabled'});
