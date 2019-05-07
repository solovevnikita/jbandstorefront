import { PhotoModel } from './photoModel';


export interface CustomerReviewListModel {
    /**
     * Идентификатор отзыва
     */
    reviewId: number;
    /**
     * Дата отзыва
     */
    reviewDate: Date;
    /**
     * Рейтинг
     */
    rating: number;
    /**
     * Текст отзыва
     */
    reviewText?: string;
    /**
     * Имя пользователя
     */
    userFullName?: string;
    /**
     * Аватар пользователя
     */
    userAvatarPhoto?: PhotoModel;
    /**
     * Метод входа (token, vkontakte, facebook, instagram, google)
     */
    userRegisterMethod?: string;
}
