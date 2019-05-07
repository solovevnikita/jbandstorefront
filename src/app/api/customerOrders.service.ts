import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { CustomerOrderCreateResponseModel } from '../model/customerOrderCreateResponseModel';
import { CustomerOrderListModel } from '../model/customerOrderListModel';
import { CustomerOrderModel } from '../model/customerOrderModel';
import { ErrorModel } from '../model/errorModel';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class CustomerOrdersService {

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
     * Создание нового заказа
     * Создание нового заказа Для ввода адреса следует использовать сервис DaData -
     * https://dadata.ru/suggestions/ Ключ API будет предоставлен. Используются следующие данные.
     * - suggestion.data.country;
     *  - suggestion.data.postal_code;
     * - suggestion.data.region;
     * - suggestion.data.area;
     * - suggestion.data.city;
     * - suggestion.data.street;
     * - suggestion.data.house;
     * - suggestion.data.flat;
     * - suggestion.data.geo_lat;
     * - suggestion.data.geo_lon.
     * После создания заказа переводим пользователя на paymentUri.
     * @param entity entity
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerOrdersCreate(
        entity?: CustomerOrderModel, observe?: 'body', reportProgress?: boolean): Observable<CustomerOrderCreateResponseModel>;
    public customerOrdersCreate(
        entity?: CustomerOrderModel, observe?: 'response', reportProgress?: boolean
    ): Observable<HttpResponse<CustomerOrderCreateResponseModel>>;
    public customerOrdersCreate(
        entity?: CustomerOrderModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CustomerOrderCreateResponseModel>>;
    public customerOrdersCreate(entity?: CustomerOrderModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.post<CustomerOrderCreateResponseModel>(`${this.basePath}/api/v10/customer/orders/create`,
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
     * Получение информации о последнем заказе для заполнения формы нового заказа
     * Получение информации о последнем заказе для заполнения формы нового заказа
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerOrdersGetLastInfo(observe?: 'body', reportProgress?: boolean): Observable<CustomerOrderModel>;
    public customerOrdersGetLastInfo(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CustomerOrderModel>>;
    public customerOrdersGetLastInfo(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CustomerOrderModel>>;
    public customerOrdersGetLastInfo(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<CustomerOrderModel>(`${this.basePath}/api/v10/customer/orders/getLastInfo`,
            {
                withCredentials: true,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Список заказов покупателя
     * Список заказов покупателя
     * @param limit Количество элементов для выборки
     * @param offset Смещение для выборки
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerOrdersList(
        limit?: number, offset?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<CustomerOrderListModel>>;
    public customerOrdersList(
        limit?: number, offset?: number, observe?: 'response', reportProgress?: boolean
    ): Observable<HttpResponse<Array<CustomerOrderListModel>>>;
    public customerOrdersList(
        limit?: number, offset?: number, observe?: 'events', reportProgress?: boolean
    ): Observable<HttpEvent<Array<CustomerOrderListModel>>>;
    public customerOrdersList(
        limit?: number, offset?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
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

        return this.httpClient.get<Array<CustomerOrderListModel>>(`${this.basePath}/api/v10/customer/orders/list`,
            {
                params: queryParameters,
                withCredentials: true,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
