import { CustomerBasketItemModel } from './customerBasketItemModel';


export interface CustomerBasketModel {
    /**
     * Сумма доставки
     */
    deliverySum: number;
    /**
     * Общая сумма товаров в корзине
     */
    totalSum: number;
    /**
     * Товары в корзине
     */
    details?: Array<CustomerBasketItemModel>;
}
