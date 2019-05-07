export interface ProductAttributeModel {
    /**
     * Идентификатор атрибута
     */
    productAttributeId: number;
    /**
     * Идентификатор родительской категории
     */
    parentId?: number;
    /**
     * Наименование
     */
    name: string;
    /**
     * Порядок сортировки
     */
    displaySeq?: string;
    /**
     * Цвет в формате
     */
    color?: string;
    /**
     * Количество товаров в категории
     */
    counter?: number;
}
