import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from '../_services';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private errorService: ErrorService
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          return throwError(err);
        }
        if (err.status === 400 && err.error.errors) {
          this.errorService.haveError(err.error.errors);
          return throwError(err);
        }
        this.toastr.error(err.error.message);
        return throwError(err);
      }));
  }
}
