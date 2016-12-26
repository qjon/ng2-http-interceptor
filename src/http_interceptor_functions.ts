import {HttpInterceptor} from "./http_interceptor";
import {Type, Provider, OpaqueToken} from "@angular/core";
import {HttpInterceptorBackend} from "./http_interceptor_backend";
import {
    XHRBackend, RequestOptions, Http, CookieXSRFStrategy, BrowserXhr, BaseRequestOptions,
    BaseResponseOptions, XSRFStrategy, ResponseOptions
} from "@angular/http";


function httpFactory(httpInterceptorBackend: HttpInterceptorBackend, requestOptions: RequestOptions): Http {
    return new Http(httpInterceptorBackend, requestOptions);
}

function createDefaultCookieXSRFStrategy() {
    return new CookieXSRFStrategy();
}

export function createProviders(interceptorTypes: Type<HttpInterceptor>[]): Provider[] {
    let opaqueToken: OpaqueToken = new OpaqueToken('HttpInterceptor');
    //
    let interceptorProviders: Provider[] = interceptorTypes.map(type => {
        return {provide: opaqueToken, useClass: type, multi: true};
    });

    interceptorProviders = interceptorProviders.concat([
        {provide: HttpInterceptorBackend, useClass: HttpInterceptorBackend, deps: [opaqueToken, XHRBackend]},
        {provide: Http, useFactory: httpFactory, deps: [HttpInterceptorBackend, RequestOptions]},
        BrowserXhr,
        {provide: RequestOptions, useClass: BaseRequestOptions},
        {provide: ResponseOptions, useClass: BaseResponseOptions},
        XHRBackend,
        {provide: XSRFStrategy, useFactory: createDefaultCookieXSRFStrategy},
    ]);

    return interceptorProviders;
}