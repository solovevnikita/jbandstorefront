import { ErrorErrorModel } from './errorErrorModel';


/**
 * Модель ошибки
 */
export interface ErrorModel {
    /**
     * Сообщение об ошибке
     */
    message?: string;
    /**
     * Список полей с ошибками
     */
    errors?: ErrorErrorModel;
}
