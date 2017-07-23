import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthConfig, JwtHelper } from 'angular2-jwt';
import { AppState, InternalStateType } from './app.service';
import { HttpCrmApi, HttpIdeApi, HttpApi } from './shared';
import { IdentityService } from './identity';
import { CrmService } from './cms';
import { AppStore } from './app.store';
import 'rxjs/add/observable/of';

@Injectable()
export class DataResolver implements Resolve<any> {
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return Observable.of({ res: 'I am data' });
  }
}

export function authHttpServiceFactory(tokenName: string) {
  return (http: Http, options: RequestOptions, store: AppStore) => {

    const authConfig = new AuthConfig({
      tokenGetter: () => {
        return store.get(tokenName);
      },
      noJwtError: true,
      globalHeaders: [{ 'Content-Type': 'application/json' }],
    });

    return new HttpApi('http://localhost:4300', authConfig, http, options);
  }
}

/**
 * An array of services to resolve routes with data.
 */
export const APP_RESOLVER_PROVIDERS = [
  AppStore,
  DataResolver,
  JwtHelper,
  {
    provide: HttpIdeApi,
    useFactory: authHttpServiceFactory('ide_token'),
    deps: [Http, RequestOptions, AppStore]
  },
  {
    provide: HttpCrmApi,
    useFactory: authHttpServiceFactory('cms_token'),
    deps: [Http, RequestOptions, AppStore]
  },
  IdentityService,
  CrmService,
];
