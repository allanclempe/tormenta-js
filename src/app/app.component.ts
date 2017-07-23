/**
 * Angular 2 decorators and services
 */
import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { AppState } from './app.service';
import { AppStore } from './app.store';

/**
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  templateUrl: `app.component.html`
})
export class AppComponent implements OnInit {

  public environmentName: string;

  constructor(
    public appState: AppState,
    public appStore: AppStore,
    private router: Router,
    private jwtHelper: JwtHelper,
  ) {

    appStore.storeChange.subscribe(() => this.getEnvironmentName());
  }

  public ngOnInit() {
    this.getEnvironmentName();
  }

  public gotoIdentity() {

    const token = this.appStore.get('ide_token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      this.router.navigate(['/identity/login']);
      return;
    }

    this.router.navigate(['/identity/dashboard']);

  }

  public gotoBackend() {

    const token = this.appStore.get('cms_token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      // TODO: change this route to crm user login.
      this.router.navigate(['/cms/login']);
      return;
    }

    this.router.navigate(['/cms/dashboard']);

  }

  public logout() {
    this.appStore.del('cms_token');
    this.appStore.del('ide_token');
    this.router.navigate(['/']);
  }

  private getEnvironmentName() {
    const token = this.appStore.get('cms_token');
    if (!!token) {
      const obj = this.jwtHelper.decodeToken(token);
      this.environmentName = obj.env;
      return;
    }

    this.environmentName = null;
  }
}
