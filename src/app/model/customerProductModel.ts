import { PhotoModel } from './photoModel';


export interface CustomerProductModel {
    /**
     * Идентификатор товара
     */
    productId: number;
    /**
     * Идентификатор товара у магазина
     */
    outsideId?: string;
    /**
     * Наименование товара
     */
    name: string;
    /**
     * Цена товара
     */
    price: number;
    /**
     * Признак что на товар действует скидка
     */
    isDiscount: boolean;
    /**
     * Признак быстрой доставки
     */
    isFastDelivery: boolean;
    /**
     * Количество штук
     */
    pieces: number;
    /**
     * Описание упаковки
     */
    pack?: string;
    /**
     * Примечание к товару
     */
    note?: string;
    /**
     * Количество оценок с одной звездой
     */
    ratingCount1: number;
    /**
     * Количество оценок с двумя звездами
     */
    ratingCount2: number;
    /**
     * Количество оценок с тремя звездами
     */
    ratingCount3: number;
    /**
     * Количество оценок с четырьмя звездами
     */
    ratingCount4: number;
    /**
     * Количество оценок с пятью
     */
    ratingCount5: number;
    /**
     * Рейтинг товара
     */
    rating: number;
    /**
     * Признак что товар является хитом
     */
    isHitMark: boolean;
    /**
     * Признак наличия в избранном
     */
    inFavorites: boolean;
    /**
     * Количество товаров
     */
    inBasket: number;
    /**
     * Фотографии товара
     */
    photos?: Array<PhotoModel>;
}
