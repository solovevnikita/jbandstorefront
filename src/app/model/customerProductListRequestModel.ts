export interface CustomerProductListRequestModel {
    /**
     * Идентификаторы атрибутов товаров
     */
    attributesIds?: string;
    /**
     * Минимальная стоимость
     */
    priceMin?: number;
    /**
     * Максимальная стоимость
     */
    priceMax?: number;
    /**
     * Фильтр по товарам со скидкой
     */
    withDiscount?: boolean;
    /**
     * Фильтр по товарам в избранном
     */
    inFavorites?: boolean;
    /**
     * Количество элементов для выборки
     */
    limit?: number;
    offset?: number;
    /**
     * Строка поискового запроса
     */
    search?: string;
}
