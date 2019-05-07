export interface CustomerOrderCreateResponseModel {
    /**
     * Идентификатор заказа
     */
    orderId: number;
    /**
     * Ссылка для перенаправления покупателя на страницу оплаты
     */
    paymentUri: string;
}
