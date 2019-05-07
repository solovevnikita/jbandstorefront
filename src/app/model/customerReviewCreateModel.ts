export interface CustomerReviewCreateModel {
    /**
     * Рейтинг
     */
    rating: number;
    /**
     * Текст отзыва
     */
    reviewText: string;
    /**
     * Идентификатор товара в заказе
     */
    orderDetailId: number;
}
