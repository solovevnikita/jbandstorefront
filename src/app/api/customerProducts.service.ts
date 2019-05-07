import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { CounterModel } from '../model/counterModel';
import { CustomerProductModel } from '../model/customerProductModel';
import { ErrorModel } from '../model/errorModel';
import { ProductAttributeModel } from '../model/productAttributeModel';
import { ProductIdModel } from '../model/productIdModel';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class CustomerProductsService {

    protected basePath = 'https://jbandflowers.ru';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(
        protected httpClient: HttpClient,
        @Optional()@Inject(BASE_PATH) basePath: string,
        @Optional() configuration: Configuration
    ) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Добавление товара в избранное
     * Добавление товара в избранное
     * @param entity entity
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerProductsAddToFavorites(
        entity?: ProductIdModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public customerProductsAddToFavorites(
        entity?: ProductIdModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public customerProductsAddToFavorites(
        entity?: ProductIdModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public customerProductsAddToFavorites(
        entity?: ProductIdModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/api/v10/customer/products/addToFavorites`,
            entity,
            {
                withCredentials: true,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Получении информации о товаре по идентификатору
     * Получении информации о товаре по идентификатору
     * @param id Идентификатор товара
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerProductsGet(id: number, observe?: 'body', reportProgress?: boolean): Observable<CustomerProductModel>;
    public customerProductsGet(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CustomerProductModel>>;
    public customerProductsGet(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CustomerProductModel>>;
    public customerProductsGet(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling customerProductsGet.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<CustomerProductModel>(`${this.basePath}/api/v10/customer/products/get`,
            {
                params: queryParameters,
                withCredentials: true,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Получение количества товаров в избранном
     * Получение количества товаров в избранном
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerProductsGetFavoritesCount(observe?: 'body', reportProgress?: boolean): Observable<CounterModel>;
    public customerProductsGetFavoritesCount(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CounterModel>>;
    public customerProductsGetFavoritesCount(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CounterModel>>;
    public customerProductsGetFavoritesCount(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<CounterModel>(`${this.basePath}/api/v10/customer/products/getFavoritesCount`,
            {
                withCredentials: true,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Получение списка товаров
     * Получение списка товаров. Все фильтры являются необязательными.
     * @param attributesIds Идентификаторы атрибутов товаров
     * @param priceMin Минимальная стоимость
     * @param priceMax Максимальная стоимость
     * @param withDiscount Фильтр по товарам со скидкой
     * @param inFavorites Фильтр по товарам в избранном
     * @param isHitMark Фильтр товаров-бестселлеров
     * @param limit Количество элементов для выборки
     * @param offset Смещение для выборки
     * @param search Строка поискового запроса
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerProductsList(
        attributesIds?: Array<number>,
        priceMin?: number,
        priceMax?: number,
        withDiscount?: boolean,
        inFavorites?: boolean,
        isHitMark?: boolean,
        limit?: number,
        offset?: number,
        search?: string,
        observe?: 'body',
        reportProgress?: boolean): Observable<Array<CustomerProductModel>>;
    public customerProductsList(
        attributesIds?: Array<number>,
        priceMin?: number,
        priceMax?: number,
        withDiscount?: boolean,
        inFavorites?: boolean,
        isHitMark?: boolean,
        limit?: number,
        offset?: number,
        search?: string,
        observe?: 'response',
        reportProgress?: boolean): Observable<HttpResponse<Array<CustomerProductModel>>>;
    public customerProductsList(
        attributesIds?: Array<number>,
        priceMin?: number,
        priceMax?: number,
        withDiscount?: boolean,
        inFavorites?: boolean,
        isHitMark?: boolean,
        limit?: number,
        offset?: number,
        search?: string,
        observe?: 'events',
        reportProgress?: boolean): Observable<HttpEvent<Array<CustomerProductModel>>>;
    public customerProductsList(
        attributesIds?: Array<number>,
        priceMin?: number,
        priceMax?: number,
        withDiscount?: boolean,
        inFavorites?: boolean,
        isHitMark?: boolean,
        limit?: number,
        offset?: number,
        search?: string,
        observe: any = 'body',
        reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (attributesIds) {
            attributesIds.forEach((element) => {
                queryParameters = queryParameters.append('attributesIds', <any>element);
            });
        }
        if (priceMin !== undefined && priceMin !== null) {
            queryParameters = queryParameters.set('priceMin', <any>priceMin);
        }
        if (priceMax !== undefined && priceMax !== null) {
            queryParameters = queryParameters.set('priceMax', <any>priceMax);
        }
        if (withDiscount !== undefined && withDiscount !== null) {
            queryParameters = queryParameters.set('withDiscount', <any>withDiscount);
        }
        if (inFavorites !== undefined && inFavorites !== null) {
            queryParameters = queryParameters.set('inFavorites', <any>inFavorites);
        }
        if (isHitMark !== undefined && isHitMark !== null) {
            queryParameters = queryParameters.set('isHitMark', <any>isHitMark);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (search !== undefined && search !== null) {
            queryParameters = queryParameters.set('search', <any>search);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<CustomerProductModel>>(`${this.basePath}/api/v10/customer/products/list`,
            {
                params: queryParameters,
                withCredentials: true,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Получение списка атрибутов
     * Получение списка атрибутов.  По необходимости можно указывать идентификатор родительской записи для фильтра.
     * @param id Идентификатор родительской записи
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerProductsListAttributes(
        id?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<ProductAttributeModel>>;
    public customerProductsListAttributes(
        id?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ProductAttributeModel>>>;
    public customerProductsListAttributes(
        id?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ProductAttributeModel>>>;
    public customerProductsListAttributes(
        id?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<ProductAttributeModel>>(`${this.basePath}/api/v10/customer/products/listAttributes`,
            {
                params: queryParameters,
                withCredentials: true,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
 /**
     * Получение списка похожих товаров
     * Получение списка похожих товаров.
     * @param id Идентификатор товара
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerProductsListSimilar(id: number, observe?: 'body', reportProgress?: boolean): Observable<Array<CustomerProductModel>>;
    public customerProductsListSimilar(
      id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<CustomerProductModel>>>;
    public customerProductsListSimilar(
      id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<CustomerProductModel>>>;
    public customerProductsListSimilar(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling customerProductsListSimilar.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<CustomerProductModel>>(`${this.basePath}/api/v10/customer/products/listSimilar`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
    /**
     * Удаление товара из избранного
     * Удаление товара из избранного
     * @param entity entity
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerProductsRemoveFromFavorites(
        entity?: ProductIdModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public customerProductsRemoveFromFavorites(
        entity?: ProductIdModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public customerProductsRemoveFromFavorites(
        entity?: ProductIdModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public customerProductsRemoveFromFavorites(
        entity?: ProductIdModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


        let headers = this.defaultHeaders;

        // to determine the Accept header
        const httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/api/v10/customer/products/removeFromFavorites`,
            entity,
            {
                withCredentials: true,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
