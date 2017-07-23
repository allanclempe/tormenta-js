import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import {
  IdentityLoginComponent,
  DashboardComponent as iDashboardComponent,
  EnvironmentDetailComponent
} from './identity';

import {
  DashboardComponent as cDashboardComponent,
  SchemaEditComponent,
  CrmLoginComponent
} from './cms';
import { AboutComponent } from './about';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'identity/login', component: IdentityLoginComponent, },
  { path: 'identity/dashboard', component: iDashboardComponent, },
  { path: 'identity/environment/:id', component: EnvironmentDetailComponent, },
  { path: 'cms/login', component: CrmLoginComponent, },
  { path: 'cms/dashboard', component: cDashboardComponent, },
  { path: 'cms/schema/:id', component: SchemaEditComponent, },
  { path: 'cms/schema', component: SchemaEditComponent, },
  { path: 'about', component: AboutComponent },
  { path: 'detail', loadChildren: './+detail#DetailModule' },
  { path: 'barrel', loadChildren: './+barrel#BarrelModule' },
  { path: '**', component: NoContentComponent },
];
