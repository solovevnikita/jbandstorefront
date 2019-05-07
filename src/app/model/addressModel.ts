export interface AddressModel {
    /**
     * Идентификатор адреса
     */
    addressId?: number;
    /**
     * Адрес одной строкой
     */
    address: string;
    /**
     * Страна
     */
    country: string;
    /**
     * Почтовый индекс
     */
    postalCode?: string;
    /**
     * Регион
     */
    region?: string;
    /**
     * Область
     */
    area?: string;
    /**
     * Город
     */
    city?: string;
    /**
     * Улица
     */
    street?: string;
    /**
     * Номер дома
     */
    house?: string;
    /**
     * Квартира
     */
    flat?: string;
    /**
     * Географическая широта
     */
    geoLat: number;
    /**
     * Географическая долгота
     */
    geoLon: number;
}
