import { AddressModel } from './addressModel';


export interface CustomerOrderModel {
    /**
     * Дата доставки
     */
    deliveryDate: string;
    /**
     * Адрес доставки
     */
    address?: AddressModel;
    /**
     * Имя заказчика
     */
    customerFullName: string;
    /**
     * Телефон заказчика
     */
    customerPhone: string;
    /**
     * Имя получателя
     */
    recipientFullName?: string;
    /**
     * Телефон получателя
     */
    recipientPhone?: string;
    /**
     * Комментарий
     */
    comment?: string;
    /**
     * Признак разрешения получения уведомлений
     */
    isDeliveryNotifications: boolean;
    /**
     * Признак что пользователь является получателем доставки
     */
    isRecipient: boolean;
    /**
     * Признак разрешения звонка для уточнения информации
     */
    isCallAllowed: boolean;
}
