export interface AuthAccountRegisterRequestModel {
    /**
     * Имя пользователя
     */
    firstName: string;
    /**
     * Фамилия
     */
    lastName: string;
    /**
     * Адрес электронной почты
     */
    email: string;
    /**
     * Номер телефона
     */
    phone: string;
    /**
     * Пароль
     */
    password: string;
    /**
     * Подтверждение пароля
     */
    passwordConfirm: string;
}
