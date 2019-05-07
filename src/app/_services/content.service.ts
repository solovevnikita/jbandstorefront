import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { CustomerContentService } from '../api/api';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  contentRoutes = [
    {
      name: 'Партнерам',
      route: 'partners',
      id: 101
    },
    {
      name: 'Доставка',
      route: 'delivery',
      id: 102
    },
    {
      name: 'О нас',
      route: 'about',
      id: 103
    },
    {
      name: 'Контакты',
      route: 'contacts',
      id: 104
    },
    {
      name: 'Часто задаваемые вопросы',
      route: 'faq',
      id: 105
    },
    {
      name: 'Как заказать',
      route: 'how-to-order',
      id: 106
    },
    {
      name: 'Методы оплаты',
      route: 'payment-methods',
      id: 107
    },
    {
      name: 'Программа лояльности',
      route: 'loyalty-program',
      id: 108
    },
    {
      name: 'Правила возврата',
      route: 'return-policy',
      id: 109
    },
    {
      name: 'Публичная оферта',
      route: 'oferta',
      id: 110
    },
    {
      name: 'Покупателям',
      route: 'customers',
      id: 111
    },
    {
      name: 'Документы',
      route: 'documents',
      id: 112
    },
    {
      name: 'Помощь',
      route: 'help',
      id: 113
    },
    {
      name: 'Пользовательское соглашение',
      route: 'agreement',
      id: 114
    },
    {
      name: 'Партнерское соглашение',
      route: 'agent',
      id: 115
    },
    {
      name: 'Политика конфиденциальности',
      route: 'confidential',
      id: 116
    },
    {
      name: 'Соглашение об обработке персональных данных',
      route: 'privacy',
      id: 117
    },
    {
      name: 'Как ухаживать за цветами',
      route: 'how-to-care-for-flowers',
      id: 118
    }
  ];
  content: any;
  selectedId: number;
  constructor(
    private customerContent: CustomerContentService,
    private router: Router
  ) { }
  goToPage(linkName) {
    this.contentRoutes.forEach(
      elem => {
        if (elem.name === linkName) {
          this.selectedId = elem.id;
          this.router.navigate([`${elem.route}`]);
          return;
        }
      }
    );
  }
  async getContent(path = null) {
    if (path) {
      this.contentRoutes.forEach(
        elem => {
          if (elem.route === path) {
            this.selectedId = elem.id;
          }
        }
      );
    }
    await this.customerContent.customerContentGet(this.selectedId)
      .toPromise()
        .then(
          res => this.content = res.content
        );
    return this.content;
  }
}
