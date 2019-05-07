import { PhotoModel } from './photoModel';


export interface CustomerBasketItemModel {
    /**
     * Идентификатор товара
     */
    productId: number;
    /**
     * Внешний код товара
     */
    outsideId?: string;
    /**
     * Фото товара
     */
    photo?: PhotoModel;
    /**
     * Наименование товара
     */
    name: string;
    /**
     * Заказанное количество
     */
    qty: number;
    /**
     * Цена товара
     */
    price: number;
    /**
     * Стоимость товаров
     */
    totalSum: number;
}
