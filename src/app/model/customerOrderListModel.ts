import { PhotoModel } from './photoModel';


export interface CustomerOrderListModel {
    /**
     * Идентификатор товара в заказе
     */
    orderDetailId: number;
    /**
     * Идентификатор заказа
     */
    orderId: number;
    /**
     * Код товара поставщика
     */
    outsideId?: string;
    /**
     * Идентификатор товара
     */
    productId: number;
    /**
     * Фото товара
     */
    photo?: PhotoModel;
    /**
     * Наименование товара
     */
    name?: string;
    /**
     * Количество штук
     */
    pieces?: number;
    /**
     * Количество товара
     */
    qty: number;
    /**
     * Цена товара
     */
    price: number;
    /**
     * Стоимость товара
     */
    totalSum: number;
    /**
     * Дата доставки
     */
    deliveryDate?: Date;
    /**
     * Статус заказа
     */
    status?: string;
    statusId?: number;
    /**
     * Рейтинг
     */
    reviewRating?: number;
}
