export interface CustomerAccountProfileInfoModel {
  /**
   * Идентификатор пользователя
   */
  userId?: number;
  /**
   * ФИО пользователя
   */
  fullName: string;
  /**
   * Адрес электронной почты
   */
  email: string;
  /**
   * Номер телефона
   */
  phone: string;
  /**
   * Код роли (customer, shop, admin)
   */
  roleCode?: string;
}
