/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { BannerModel } from '../model/bannerModel';
import { ContentModel } from '../model/contentModel';
import { ErrorModel } from '../model/errorModel';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class CustomerContentService {

    protected basePath = 'https://jbandflowers.ru';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient,
        @Optional()@Inject(BASE_PATH) basePath: string,
        @Optional() configuration: Configuration) {
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
     * Получение страницы по идентификатору
     * Получение страницы по идентификатору
     * @param id Идентификатор контента
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerContentGet(id: number, observe?: 'body', reportProgress?: boolean): Observable<ContentModel>;
    public customerContentGet(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<ContentModel>>;
    public customerContentGet(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<ContentModel>>;
    public customerContentGet(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling customerContentGet.');
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

        return this.httpClient.get<ContentModel>(`${this.basePath}/api/v10/customer/content/get`,
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
     * Получение списка страниц
     * Получение списка страниц
     * @param id Идентификатор родительской записи
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerContentList(id?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<ContentModel>>;
    public customerContentList(id?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ContentModel>>>;
    public customerContentList(id?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ContentModel>>>;
    public customerContentList(id?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.get<Array<ContentModel>>(`${this.basePath}/api/v10/customer/content/list`,
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
     * Получение списка баннеров
     * Получение списка баннеров
     * @param id Идентификатор баннера. 1 - Карусель на главной
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public customerContentListBanners(id?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<BannerModel>>;
    public customerContentListBanners(id?: number, observe?: 'response',
    reportProgress?: boolean): Observable<HttpResponse<Array<BannerModel>>>;
    public customerContentListBanners(id?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<BannerModel>>>;
    public customerContentListBanners(id?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {


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

        return this.httpClient.get<Array<BannerModel>>(`${this.basePath}/api/v10/customer/content/listBanners`,
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
