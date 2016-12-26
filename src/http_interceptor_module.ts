/**
 * Created by yulonh on 2016/11/22.
 */
import {NgModule, ModuleWithProviders, Type} from "@angular/core";
import {createProviders} from "./http_interceptor_functions";
import {HttpInterceptor} from "./http_interceptor";
/**
 * The module that includes http interceptor providers
 */
@NgModule()
export class HttpInterceptorModule {
  static withInterceptors(interceptorTypes: Type<HttpInterceptor>[]): ModuleWithProviders {
    return {
      ngModule: HttpInterceptorModule,
      providers: [].concat(createProviders(interceptorTypes))
    };
  }
}
