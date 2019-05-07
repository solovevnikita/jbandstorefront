import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { CustomerReviewCreateModel } from '../model/customerReviewCreateModel';
import { CustomerReviewListModel } from '../model/customerReviewListModel';
import { ErrorModel } from '../model/errorModel';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class CustomerReviewsService {

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
     * Написание отзыва
     * Написание отзыва
     * @param entity entity
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerReviewsCreate(
        entity?: CustomerReviewCreateModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public customerReviewsCreate(
        entity?: CustomerReviewCreateModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public customerReviewsCreate(
        entity?: CustomerReviewCreateModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public customerReviewsCreate(
        entity?: CustomerReviewCreateModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.post<any>(`${this.basePath}/api/v10/customer/reviews/create`,
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
     * Получение списка отзывов
     * Получение списка отзывов
     * @param productId Идентификатор товара
     * @param limit Количество элементов для выборки
     * @param offset Смещение для выборки
     * @param search Строка поискового запроса
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerReviewsList(
        productId?: number, limit?: number, offset?: number, search?: string, observe?: 'body', reportProgress?: boolean
    ): Observable<Array<CustomerReviewListModel>>;
    public customerReviewsList(
        productId?: number, limit?: number, offset?: number, search?: string, observe?: 'response', reportProgress?: boolean
    ): Observable<HttpResponse<Array<CustomerReviewListModel>>>;
    public customerReviewsList(
        productId?: number, limit?: number, offset?: number, search?: string, observe?: 'events', reportProgress?: boolean
    ): Observable<HttpEvent<Array<CustomerReviewListModel>>>;
    public customerReviewsList(
        productId?: number, limit?: number, offset?: number, search?: string, observe: any = 'body', reportProgress: boolean = false
    ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (productId !== undefined && productId !== null) {
            queryParameters = queryParameters.set('productId', <any>productId);
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

        return this.httpClient.get<Array<CustomerReviewListModel>>(`${this.basePath}/api/v10/customer/reviews/list`,
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
