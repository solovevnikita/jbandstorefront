export interface CustomerReviewListRequestModel {
    /**
     * Идентификатор товара
     */
    productId?: number;
    /**
     * Количество элементов для выборки
     */
    limit?: number;
    /**
     * Смещение для выборки
     */
    offset?: number;
    /**
     * Строка поискового запроса
     */
    search?: string;
}
