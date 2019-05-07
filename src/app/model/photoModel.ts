export interface PhotoModel {
    /**
     * Идентификатор фотографии
     */
    id?: number;
    /**
     * Изображение с максимальным размером 130 пикс
     */
    fileName130?: string;
    /**
     * Изображение с максимальным размером 640 пикс
     */
    fileName640?: string;
    /**
     * Изображение с максимальным размером 860 пикс
     */
    fileName860?: string;
    /**
     * Изображение с максимальным размером 1280 пикс
     */
    fileName1280?: string;
    /**
     * Изображение с максимальным размером 2560 пикс
     */
    fileName2560?: string;
    /**
     * Оригинальное изображение
     */
    originalFileName?: string;
    /**
     * Оригинальная ширина изображения
     */
    originalWidth?: number;
    /**
     * Оригинальная высота изображения
     */
    originalHeight?: number;
}
