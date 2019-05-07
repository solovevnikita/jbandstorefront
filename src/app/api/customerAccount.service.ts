import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { CustomerAccountProfileInfoModel } from '../model/customerAccountProfileInfoModel';
import { ErrorModel } from '../model/errorModel';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class CustomerAccountService {

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
     * Получение информации о профиле пользователя
     * Получение информации о профиле пользователя
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerAccountGetProfileInfo(observe?: 'body', reportProgress?: boolean): Observable<CustomerAccountProfileInfoModel>;
    public customerAccountGetProfileInfo(
        observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CustomerAccountProfileInfoModel>>;
    public customerAccountGetProfileInfo(
        observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CustomerAccountProfileInfoModel>>;
    public customerAccountGetProfileInfo(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.get<CustomerAccountProfileInfoModel>(`${this.basePath}/api/v10/customer/account/getProfileInfo`,
            {
                withCredentials: true,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Получение скидки при подписке на каналы
     * Получение скидки при подписке на каналы
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerAccountTakeDiscountBySocialNetworks(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public customerAccountTakeDiscountBySocialNetworks(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public customerAccountTakeDiscountBySocialNetworks(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public customerAccountTakeDiscountBySocialNetworks(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

        return this.httpClient.post<any>(`${this.basePath}/api/v10/customer/account/takeDiscountBySocialNetworks`,
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
     * Сохранение информации о профиле пользователя
     * Сохранение информации о профиле пользователя
     * @param entity entity
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerAccountUpdateProfileInfo(
        entity?: CustomerAccountProfileInfoModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public customerAccountUpdateProfileInfo(
        entity?: CustomerAccountProfileInfoModel, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public customerAccountUpdateProfileInfo(
        entity?: CustomerAccountProfileInfoModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public customerAccountUpdateProfileInfo(
        entity?: CustomerAccountProfileInfoModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.post<any>(`${this.basePath}/api/v10/customer/account/updateProfileInfo`,
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
