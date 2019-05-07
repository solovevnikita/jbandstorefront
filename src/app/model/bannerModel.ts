import { PhotoModel } from './photoModel';


export interface BannerModel {
    /**
     * Идентификатор баннера
     */
    id?: number;
    /**
     * Имя баннера
     */
    name: string;
    /**
     * Тип ссылки для перехода
     */
    linkTypeId?: number;
    /**
     * Список изображений
     */
    photos?: Array<PhotoModel>;
}
