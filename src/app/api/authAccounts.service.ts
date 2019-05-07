import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
        HttpResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs';

import { AuthAccountLoginRequestModel } from '../model/authAccountLoginRequestModel';
import { AuthAccountRegisterRequestModel } from '../model/authAccountRegisterRequestModel';
import { ErrorModel } from '../model/errorModel';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';


@Injectable()
export class AuthAccountsService {

  protected basePath = 'https://jbandflowers.ru';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();

  constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
      if (basePath) {
          this.basePath = basePath;
      }
      if (configuration) {
          this.configuration = configuration;
          this.basePath = basePath || configuration.basePath || this.basePath;
      }
  }

  private canConsumeForm(consumes: string[]): boolean {
      const form = 'application/json';
      for (const consume of consumes) {
          if (form === consume) {
              return true;
          }
      }
      return false;
  }


  /**
   * Авторизация пользователя с помощью социальных сетей
   * Метод предназначен для авторизации пользователя с помощью социальных сетей.
   * Доступные социальные сети: - vkontakte; - facebook; - instagram; - google.
   * @param providerName Имя провайдера
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public authAccountsExternalLogin(providerName: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public authAccountsExternalLogin(providerName: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public authAccountsExternalLogin(providerName: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public authAccountsExternalLogin(providerName: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

      if (providerName === null || providerName === undefined) {
          throw new Error('Required parameter providerName was null or undefined when calling authAccountsExternalLogin.');
      }

      let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
      if (providerName !== undefined && providerName !== null) {
          queryParameters = queryParameters.set('providerName', <any>providerName);
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

      return this.httpClient.get<any>(`${this.basePath}/auth/v10/accounts/externalLogin`,
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
   * Авторизация пользователя
   * Метод предназначен для авторизации пользователя.
   * Если авторизация не была успешна, то сервер вернет альтернативный статус HTTP 400 с текстом ошибки.
   * Ограничения политики безопасности: -  Интервал между повторными вызовами метода должен быть не менее 5 секунд.
   * @param body Параметры авторизации
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public authAccountsLogin(body: AuthAccountLoginRequestModel, observe?: 'body', reportProgress?: boolean): Observable<any>;
  public authAccountsLogin(
    body: AuthAccountLoginRequestModel, observe?: 'response', reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public authAccountsLogin(body: AuthAccountLoginRequestModel, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public authAccountsLogin(body: AuthAccountLoginRequestModel, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

    if (body === null || body === undefined) {
      throw new Error('Required parameter body was null or undefined when calling authAccountsLogin.');
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
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    return this.httpClient.post<any>(`${this.basePath}/auth/v10/accounts/login`,
      body,
      {
        withCredentials: true,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * Регистрация пользователя
   * Метод предназначен для регистрации пользователя.
   * Если реализация не была успешна, то сервер вернет альтернативный статус HTTP 400 с текстом ошибки.
   * Ограничения политики безопасности: -  Интервал между повторными вызовами метода должен быть не менее 5 секунд.
   * @param body Параметры регистрации
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public authAccountsRegister(
    body: AuthAccountRegisterRequestModel, observe?: 'body', reportProgress?: boolean
  ): Observable<any>;
  public authAccountsRegister(
    body: AuthAccountRegisterRequestModel, observe?: 'response', reportProgress?: boolean
  ): Observable<HttpResponse<any>>;
  public authAccountsRegister(
    body: AuthAccountRegisterRequestModel, observe?: 'events', reportProgress?: boolean
  ): Observable<HttpEvent<any>>;
  public authAccountsRegister(
    body: AuthAccountRegisterRequestModel, observe: any = 'body', reportProgress: boolean = false
  ): Observable<any> {

      if (body === null || body === undefined) {
          throw new Error('Required parameter body was null or undefined when calling authAccountsRegister.');
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
      const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
      if (httpContentTypeSelected !== undefined) {
          headers = headers.set('Content-Type', httpContentTypeSelected);
      }

      return this.httpClient.post<any>(`${this.basePath}/auth/v10/accounts/register`,
          body,
          {
              withCredentials: true,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }
    /**
   * Выход из аккаунта
   * Метод предназначен для выхода пользователя из аккаунта.
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public authAccountsLogoff(observe?: 'body', reportProgress?: boolean): Observable<any>;
  public authAccountsLogoff(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
  public authAccountsLogoff(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
  public authAccountsLogoff(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

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

    return this.httpClient.get<any>(`${this.basePath}/auth/v10/accounts/logoff`,
        {
            withCredentials: this.configuration.withCredentials,
            headers: headers,
            observe: observe,
            reportProgress: reportProgress
        }
    );
  }

}
