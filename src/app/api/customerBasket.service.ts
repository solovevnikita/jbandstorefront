import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { CounterModel } from '../model/counterModel';
import { CustomerBasketModel } from '../model/customerBasketModel';
import { CustomerBasketSetQuantityRequestModel } from '../model/customerBasketSetQuantityRequestModel';
import { ErrorModel } from '../model/errorModel';
import { ProductIdModel } from '../model/productIdModel';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class CustomerBasketService {

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
     * Добавление товара в корзину
     * Добавление товара в корзину
     * @param entity entity
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerBasketAddProduct(entity?: ProductIdModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public customerBasketAddProduct(entity?: ProductIdModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public customerBasketAddProduct(entity?: ProductIdModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public customerBasketAddProduct(entity?: ProductIdModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.post<any>(`${this.basePath}/api/v10/customer/basket/addProduct`,
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
     * Очистка корзины
     * Очистка корзины
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerBasketClear(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public customerBasketClear(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public customerBasketClear(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public customerBasketClear(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.post<any>(`${this.basePath}/api/v10/customer/basket/clear`,
            null,
            {
                withCredentials: true,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Получение товаров в корзине
     * Получение товаров в корзине
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerBasketGet(observe?: 'body', reportProgress?: boolean): Observable<CustomerBasketModel>;
    public customerBasketGet(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CustomerBasketModel>>;
    public customerBasketGet(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CustomerBasketModel>>;
    public customerBasketGet(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<CustomerBasketModel>(`${this.basePath}/api/v10/customer/basket/get`,
            {
                withCredentials: true,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Получение количества товаров в корзине
     * Получение количества товаров в корзине
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerBasketGetCount(observe?: 'body', reportProgress?: boolean): Observable<CounterModel>;
    public customerBasketGetCount(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CounterModel>>;
    public customerBasketGetCount(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CounterModel>>;
    public customerBasketGetCount(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<CounterModel>(`${this.basePath}/api/v10/customer/basket/getCount`,
            {
                withCredentials: true,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Удаление товара из корзины
     * Удаление товара из корзины
     * @param entity entity
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerBasketRemoveProduct(entity?: ProductIdModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public customerBasketRemoveProduct(
        entity?: ProductIdModel, observe?: 'response', reportProgress?: boolean
    ): Observable<HttpResponse<any>>;
    public customerBasketRemoveProduct(entity?: ProductIdModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public customerBasketRemoveProduct(entity?: ProductIdModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.post<any>(`${this.basePath}/api/v10/customer/basket/removeProduct`,
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
     * Установка количества товара для покупки
     * Установка количества товара для покупки
     * @param entity entity
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerBasketSetQuantity(
        entity?: CustomerBasketSetQuantityRequestModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public customerBasketSetQuantity(
        entity?: CustomerBasketSetQuantityRequestModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public customerBasketSetQuantity(
        entity?: CustomerBasketSetQuantityRequestModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public customerBasketSetQuantity(
        entity?: CustomerBasketSetQuantityRequestModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.post<any>(`${this.basePath}/api/v10/customer/basket/setQuantity`,
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
