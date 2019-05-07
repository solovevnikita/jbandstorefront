export interface ContentModel {
    /**
     * Идентификатор контента
     */
    id?: number;
    /**
     * Идентификатор родительской записи
     */
    parentId?: number;
    /**
     * Заголовок
     */
    subject?: string;
    /**
     * Текст содержимого
     */
    content?: string;
    /**
     * Порядок сортировки
     */
    displaySeq: number;
}
