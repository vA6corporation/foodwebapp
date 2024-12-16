import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./foods/foods.routes').then(m => m.routes) },
    { path: 'subscriptions', loadChildren: () => import('./subscription/subscription.routes').then(m => m.routes) },
    { path: 'turns', loadChildren: () => import('./turns/turns.routes').then(m => m.routes) },
    { path: 'businesses', loadChildren: () => import('./businesses/businesses.routes').then(m => m.routes) },
    { path: 'customers', loadChildren: () => import('./customers/customers.routes').then(m => m.routes) },
    { path: 'reports', loadComponent: () => import('./reports/reports/reports.component').then(c => c.ReportsComponent) },
];
