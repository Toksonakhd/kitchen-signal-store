
import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { KitchenOrders } from './features/kitchen-orders/kitchen-orders';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'kitchen', component: KitchenOrders },
  { path: '**', redirectTo: 'login' }
];
